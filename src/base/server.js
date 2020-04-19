/**
 * @flow
 */

/* eslint-disable import/first */
/* eslint-disable import/prefer-default-export */
/* eslint-disable flowtype/no-weak-types */

require('source-map-support/register');
require('@babel/register');
require('@babel/polyfill');

import fs from 'fs';
import Path from 'path';
import pino from 'pino';
import Pino from 'hapi-pino';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';



const SERVER_NAME_DEFAULT: string = 'Template Server';
const LOG_DIR_DEFAULT: string = 'logs';

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
  controller: any;
}

export interface ServerParams {
  name: string;
  port: number;
  host: string;
  logDir: string;
  debug?: boolean;
}

/**
 * Abstraction to manage running the server.
 * Instantiates on application server start up inside `entry.js` file or wherever the intial "main" script is
 *
 * @type {Server}
 */
export class Server {
  server: any;
  name: string;
  logDir: string;

  /**
   * Server Constructor
   */
  constructor({ name, port, host, logDir, debug }: ServerParams) {
    this.name = name || SERVER_NAME_DEFAULT;
    this.logDir = logDir || LOG_DIR_DEFAULT;
    this.server = Hapi.server({
      port,
      host,
      // Sets errors to print to console while running
      debug: debug === true ? { request: ['error'] } : undefined
    });
  }

  /**
   * Shutdown the Hapi Server Properly
   * @param  {Function} callback callback to run after server has shutdown
   * @return {undefined}            no return
   */
  shutdown(callback: Function) {
    // TODO: Set Shutdown Timeout from config
    this.server.stop({ timeout: 10000 }).then((err: Error) => {
      if (err) {
        // TODO: Log Hapi Shutdown Error
      }
      callback(err);
    });
  }

  /**
   * Starts the server and registers any plugins
   * @return {Promise} Resolves once server has started
   */
  async run() {
    await this.server.start();
    process.stdout.write(`\n\n ${this.name} started on ${this.server.info.port} \n\n`);

    // Serve Docs with OpenAPI and Swagger UI
    // visit at http://localhost:3333/docs/swagger/index.html
    await this.server.register({
      plugin: Inert
    });

    // Create `logs` directory (so we only see errors and console logs in process out)
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }

    await this.server.register({
      plugin: Pino,
      options: {
        prettyPrint: false,
        logEvents: [
          'onRequest',
          'response',
          'request-error'
        ],
        // Creates a log of all the requests made and info as well as response status error/success
        stream: pino.destination(Path.resolve(this.logDir, 'pino.log'))
      }
    });

    // TODO: Separate stream for errors?

  }

  /**
   * Logs a message through hapi-pino
   * @param  {string[]} tags for pino log record
   * @param  {string} data for pino log record
   * @return {undefined}
   */
  log({ tags, data }: { tags: string[]; data: string }) {
    this.server.log(tags, data);
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
    for (let i: number = 0; i < routes.length; i++) {
      this.addEndpoint(routes[i]);
    }
  }
}
