/**
 * @flow
 *
 * Entry point that loads all routes for the server
 */
import path from 'path';
import { Server, EndpointConfig } from './base/server.js';
import { HapiRequest, HapiHandler } from './base/request/hapi-request.interface.js';
import mariadb from './helpers/mariadb.helper.js';
import CONFIG from './helpers/config.helper.js';

// TODO: auto detect routes
// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
import adminRoutes from './controllers/admin.controller.js';
import helloRoutes from './controllers/hello.controller.js';
import noteRoutes from './controllers/note.controller.js';

/**
 * Build the routes from files and add docs if CONFIG set
 * @type {Array<EndpointConfig>}
 */
const apiRoutes: Array<EndpointConfig> = helloRoutes.concat(noteRoutes);
apiRoutes.forEach((route: EndpointConfig) => {
  route.path = CONFIG.PATHS.api + route.path;
});

const docRoutes: Array<EndpointConfig> = [
  {
    method: 'GET',
    path: CONFIG.PATHS.api,
    controller: {
      file: path.resolve(__dirname, '../openapi.yaml')
    }
  },
  {
    method: 'GET',
    path: '/docs/{param*}',
    controller: {
      directory: {
        path: path.resolve(__dirname, '../docs'),
        index: true,
        redirectToSlash: true
      }
    }
  },
  {
    method: 'GET',
    path: '/docs',
    controller: (request: HapiRequest, handler: HapiHandler): any => { // eslint-disable-line
      return handler.redirect('/docs/');
    }
  }
];
/**
 * Entry point to run the server
 * @return {undefined} no return
 */
export default async function main() {
  // TODO: Check if mysql can be connected/db exists (use name in config file)
  // Only serve healthcheck if error (redirect all other pages to healtcheck?)
  try {
    const server: Server = new Server({
      name: CONFIG.SERVER.name,
      host: CONFIG.SERVER.host,
      port: CONFIG.SERVER.port,
      debug: CONFIG.LOGS.debug,
      logDir: CONFIG.LOGS.dir,
      logLevel: CONFIG.LOGS.level
    });

    await server.run();

    server.addEndpoints(apiRoutes);
    server.addEndpoints(adminRoutes);

    if (CONFIG.SERVER.docs) {
      server.addEndpoints(docRoutes);
    }

    process.on('SIGTERM', () => {
      attemptGracefulShutdown(server);
    });
    process.on('SIGUSR2', () => { // For nodemon?
      attemptGracefulShutdown(server);
    });

    server.log({ tags: ['STARTUP'], data: 'server startup complete' });
  } catch (err) {
    // Likely caused by "bad" endpoint (empty/ duplicate paths/ no controller)
    process.stdout.write('Server startup failed!  [Likely due to local changes or missing dependencies]\n\n');

    process.exit(1);
  }
}
main();



/**
 * Attempt to shutdown the server and database connections
 * @param  {Server} server Server Object to be shutdown
 * @return {undefined}        undefined
 */
function attemptGracefulShutdown(server: Server) {
  server.log({ tags: ['SHUTDOWN'], data: 'shutdown signal' });
  server.shutdown((hapiErr: Error) => {
    server.log({ tags: ['SHUTDOWN'], data: 'hapi server shutdown' });
    mariadb.shutdown((dbErr: Error) => {
      server.log({ tags: ['SHUTDOWN'], data: 'mariadb shutdown' });

      process.exit(hapiErr || dbErr ? 1 : 0);
    });
  });
}

// What is this about again?
process.on('unhandledRejection', (err) => { // eslint-disable-line
  process.stdout.write(JSON.stringify(err));
  process.exit(1);
});
process.on('unhandledException', (err) => { // eslint-disable-line
  process.stdout.write(JSON.stringify(err));
  process.exit(1);
});
