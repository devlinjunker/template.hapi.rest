/**
 * @flow
 *
 * Entry point that loads all routes for the server
 */

import Server from './base/server.js';


const server = new Server();

server.run();

process.on('unhandledRejection', (err) => {
  process.stdout.write(JSON.stringify(err));
  process.exit(1);
});

import infoRoutes from './controllers/info.controller.js';
import helloRoutes from './controllers/hello.controller.js';
import noteRoutes from './controllers/note.controller.js';

const routes = infoRoutes.concat(helloRoutes, noteRoutes);



server.addEndpoints(routes);

// auto detect routes
// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
