
import Server from "./server.js";

const server = new Server();

server.run();

process.on("unhandledRejection", (err) => {
  process.stdout.write(err);
  process.exit(1);
});

import infoRoutes from "./controllers/info.js";
import helloRoutes from "./controllers/hello.js";

let routes = infoRoutes.concat(helloRoutes);

server.addEndpoints(routes);
