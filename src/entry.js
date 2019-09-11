//@flow

import Server from "./base/server.js";

/**
 * Entry point that loads all routes for the server
 */

const server = new Server();

server.run();

process.on("unhandledRejection", (err, err2) => {
  process.stdout.write(JSON.stringify(err));
  process.exit(1);
});

import infoRoutes from "./controllers/info.js";
import helloRoutes from "./controllers/hello.js";

let routes = infoRoutes.concat(helloRoutes);

server.addEndpoints(routes);

// auto detect routes
// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
