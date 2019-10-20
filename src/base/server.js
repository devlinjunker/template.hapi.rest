/**
 * @flow
 */
require('source-map-support/register');
require('@babel/register');
require('@babel/polyfill');
import Pino from 'hapi-pino';
import Hapi from '@hapi/hapi';

/**
 * Endpoint that can be created, should have a http method, path and controller that resolves when
 * the path is hit
 * @param {string} method     HTTP method the endpoint must be called with to trigger controller
 * @param {string} path       URL path of endpoint
 * @param {Function} controller Handler function that is triggered when endpoint is hit
 */
export interface EndpointConfig {
  method: string;
  path: string;
  controller: Function; // eslint-disable-line
}

/**
 * Request Object that is passed to the controller as the first parameter
 * from https://github.com/hapijs/hapi/blob/master/API.md#request
 */
export interface HapiRequest {
  server: any; // eslint-disable-line
  headers: any; // eslint-disable-line
  // from path
  params: any; // eslint-disable-line
  // Body of a POST request
  payload: any; // eslint-disable-line
};


/**
 * Abstraction to manage running the server. Instantiate on application server start up
 * inside `entry.js` file or wherever the intial "main" script is
 *
 * @type {Server} class
 */
export class Server {
  server: any; // eslint-disable-line

  /**
   * Server Constructor
   */
  constructor() {
    this.server = Hapi.server({
      port: 3333,
      host: 'localhost'
    });
  }

  /**
   * Starts the server and registers any plugins
   * @return {Promise} Resolves once server has started
   */
  async run() {
    await this.server.start();
    process.stdout.write('Server started on ' + this.server.info.port);

    await this.server.register({
      plugin: Pino,
      options: {
        prettyPrint: false,
        logEvents: ['response']
      }
    });
  }


  /**
   * Adds an endpoint at the path given handled by the controller
   * @param {EndpointConfig} endpoint configuration
   * @return {undefined}
   */
  addEndpoint({ method, path, controller }: EndpointConfig) {
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
   * @param {Array<EndpointConfig>} routes Routes to add to the server
   * @returns {undefined}
   */
  addEndpoints(routes: Array<EndpointConfig>) {
    for (let i = 0; i < routes.length; i++) {
      this.addEndpoint(routes[i]);
    }
  }
}
