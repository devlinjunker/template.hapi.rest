/**
 * @flow
 */
/* eslint-disable import/first */
require('source-map-support/register');
require('@babel/register');
require('@babel/polyfill');

import fs from 'fs';
import path from 'path';
import pino from 'pino';
import Pino from 'hapi-pino';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';



const SERVER_NAME_DEFAULT: string = 'Template Server';

const LOG_DIR_DEFAULT: string = 'logs';
const LOG_LEVEL_DEFAULT: string = 'info';

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
  controller: any; // eslint-disable-line
}

/**
 * Hapi Handler for returning messages or setting error codes during requests
 * @type {HapiHandler}
 */
export interface HapiHandler {
  code: Function; // eslint-disable-line
  response: Function; // eslint-disable-line
  redirect: Function; //eslint-disable-line
}

/**
 * Request Error Class to help set a response code and message to display to the user
 * @type {RequestError}
 */
export class RequestError extends Error {
  code: number;

  /**
   * Create a new Request Error
   * @param {string} msg  message to display when returned
   * @param {number} code response status code to set in Hapi Response
   */
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }
}

/**
 * Request Object that is passed to the controller function as the first parameter
 * from https://github.com/hapijs/hapi/blob/master/API.md#request
 * @type {HapiRequest}
 */
export interface HapiRequest {
  server: any; // eslint-disable-line
  headers: any; // eslint-disable-line
  // from path
  params: any; // eslint-disable-line
  // Body of a POST request
  payload: any; // eslint-disable-line
  logger: any; // eslint-disable-line
};


export interface ServerParams {
  name?: string;
  port: number;
  host: string;
  logDir: string;
  debug?: boolean; // Should we show error messages in stdout of server process (for developer/debugging)
  logLevel?: string;
}

/**
 * Abstraction to manage running the server.
 * Instantiates on application server start up inside `entry.js` file or wherever the intial "main" script is
 *
 * @type {Server}
 */
export class Server {
  server: any; // eslint-disable-line
  name: string;

  logDir: string;
  logLevel: string;

  /**
   * Server Constructor
   */
  constructor({ name, port, host, logDir, debug, logLevel }: ServerParams) {
    this.name = name || SERVER_NAME_DEFAULT;
    this.logDir = logDir || LOG_DIR_DEFAULT;
    this.logLevel = logLevel || LOG_LEVEL_DEFAULT;
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
  shutdown(callback: Function) { // eslint-disable-line flowtype/no-weak-types
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
    process.stdout.write('\n\n' + this.name + ' started on ' + this.server.info.port + '\n\n');

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
        logEvents: ['response', 'request-error'],
        level: this.logLevel,
        // Creates a log of all the requests made and info as well as response status error/success
        stream: pino.destination(path.resolve(this.logDir, 'pino.log'))
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
  addEndpoint({ method, path, controller }: EndpointConfig) { // eslint-disable-line no-shadow
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
