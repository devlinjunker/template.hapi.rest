/**
 * @flow
 *
 * Entry point that loads all routes for the server
 */

import { Server } from './base/server.js';

// TODO: auto detect routes
// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
import infoRoutes from './controllers/info.controller.js';
import helloRoutes from './controllers/hello.controller.js';
import noteRoutes from './controllers/note.controller.js';


const routes = infoRoutes.concat(helloRoutes, noteRoutes);

// TODO: check if we're in development and only serve docs if we are
const shouldServeDocs = true;
if (shouldServeDocs) {
  routes.push({
    method: 'GET',
    path: '/openapi.yaml',
    controller: {
      // TODO: Fix this
      file: 'openapi.yaml'
    }
  });

  routes.push({
    method: 'GET',
    path: '/docs/{param*}',
    controller: {
      directory: {
        // TODO: Fix this
        path: '/Users/djunker/js/template/template.node.hapi/docs',
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
async function main() {
  const server = new Server();

  await server.run();

  server.addEndpoints(routes);
}
main();

// What is this about again?
process.on('unhandledRejection', (err) => { // eslint-disable-line
  process.stdout.write(JSON.stringify(err));
  process.exit(1);
});
