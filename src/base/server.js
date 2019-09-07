//@flow
const Pino = require("hapi-pino");
const Hapi = require("@hapi/hapi");


/**
 * Endpoint that can be created, should have a http method, path and controller that resolves when
 * the path is hit
 */
interface Endpoint {
  method: string;
  path: string;
  controller: Function;
}

/**
 * Server class that starts and initializes Hapi server
 */
export default class Server {
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
    process.stdout.write("Server started on " + this.server.info.port);

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
      handler: controller,
      options: {
        cors: true
      }
    });
  }

  /**
   * Adds the endpoints given to the server
   * @param {Array<Endpoint>} routes Routes to add to the server
   */
  addEndpoints(routes: Array<Endpoint>) {
    for(var i = 0; i < routes.length; i++) {
      this.addEndpoint(routes[i]);
    }
  }
}
