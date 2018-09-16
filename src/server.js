//@flow
require("babel-core/register");
require("babel-polyfill");

const Pino = require("hapi-pino");
const Hapi = require("hapi");

/**
 * Server Info Object containing useful information about the running server
 */
interface ServerInfo {
  created: number;
  started: number;
  host: string;
  port: string;
  protocol: string;
  id: string;
  uri: string;
  address: string;
}

interface Endpoint {
  method: string;
  path: string;
  controller: Function;
}

/**
 * Server class that starts and initializes Hapi server
 */
export class Server {
  server: any;

  constructor() {
    this.server = Hapi.server({
      port: 3333,
      host: "localhost"
    });
  }

  /**
   * Starts the server and registers any plugins
   * @return {Promise} Resolves once server has started
   */
  async run() {
    await this.server.start();
    process.stdout.write("Server started on " + this.getInfo().port);

    await this.server.register({
      plugin: Pino,
      options: {
        prettyPrint: false,
        logEvents: ["response"]
      }
    });
  }


  /**
   * Adds an endpoint at the path given handled by the controller
   * @param {string} method     HTTP method the endpoint must be called with to trigger controller
   * @param {string} path       URL path of endpoint
   * @param {Function} controller Handler function that is triggered when endpoint is hit
   */
  addEndpoint({ method, path, controller}: Endpoint) {
    this.server.route({
      method,
      path,
      handler: controller
    });
  }

  /**
   * Returns the server information provided by Hapi
   * @type {Server} information provided by Hapi
   */
  getInfo() : ServerInfo {
    return this.server.info;
  }
}

const server = new Server();

server.run();

process.on("unhandledRejection", (err) => {
  process.stdout.write(err);
  process.exit(1);
});


export default server;
