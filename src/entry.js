/**
 * @flow
 *
 * Entry point that loads all routes for the server
 */
import path from 'path';
import { Server, EndpointConfig } from './base/server.js';
import mariadb from './helpers/mariadb.helper.js';
import CONFIG from './helpers/config.helper.js';

// TODO: auto detect routes
// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
import infoRoutes from './controllers/info.controller.js';
import helloRoutes from './controllers/hello.controller.js';
import noteRoutes from './controllers/note.controller.js';

/**
 * Build the routes from files and add docs if CONFIG set
 * @type {Array<EndpointConfig>}
 */
const routes: Array<EndpointConfig> = infoRoutes.concat(helloRoutes, noteRoutes);
if (CONFIG.SERVER.docs) {
  routes.push({
    method: 'GET',
    path: '/openapi.yaml',
    controller: {
      file: path.resolve(__dirname, '../openapi.yaml')
    }
  });

  routes.push({
    method: 'GET',
    path: '/docs/{param*}',
    controller: {
      directory: {
        path: path.resolve(__dirname, '../docs'),
        index: true,
        redirectToSlash: true
      }
    }
  });
}
/**
 * Entry point to run the server
 * @return {undefined} no return
 */
export async function main() {
  // TODO: Check if mysql can be connected/db exists (use name in config file)
  // Only serve healthcheck if error (redirect all other pages to healtcheck?)

  const server: Server = new Server();

  await server.run();

  server.addEndpoints(routes);

  process.on('SIGTERM', () => {
    attemptGracefulShutdown(server);
  });
  process.on('SIGUSR2', () => { // For nodemon?
    attemptGracefulShutdown(server);
  });
}
main();

/**
 * Attempt to shutdown the server and database connections
 * @param  {Server} server Server Object to be shutdown
 * @return {undefined}        undefined
 */
function attemptGracefulShutdown(server: Server) {
  console.log('shutdown signal');
  server.shutdown((hapiErr: Error) => {
    console.log('hapi server shutdown');
    mariadb.shutdown((dbErr: Error) => {
      console.log('mariadb shutdown');
      process.exit(hapiErr || dbErr ? 1 : 0);
    });
  });
}

// What is this about again?
process.on('unhandledRejection', (err) => { // eslint-disable-line
  process.stdout.write(JSON.stringify(err));
  process.exit(1);
});
