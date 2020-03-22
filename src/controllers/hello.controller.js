/**
 * @flow
 */
// For some reason this can't use the `app` alias but can do relative pathing here... :/
import { HapiRequest } from '../base/server.js';

/**
 * Controllers for Basic "Hello World" Functions
 *
 * See https://github.com/hapijs/hapi/blob/master/API.md#request for HapiRequest definition
 */
export class HelloWorld {
  /**
   * Returns 'Hello World!'
   * @return {String} Hello World!
   */
  static basic(): string {
    return 'Hello World!';
  }

  /**
   * Returns a customized Hello Message
   * @param  {HapiRequest} request Request Parameters
   * @return {String}         Customized Hello Message
   */
  static name(request: HapiRequest): string {

    const name: string = request.params.name;

    return name + ' says: ' + Math.random() + '!!!!';
  }
}

export default [
  {
    path: '/hello',
    method: 'GET',
    controller: HelloWorld.basic
  },
  {
    path: '/{name}',
    method: 'GET',
    controller: HelloWorld.name
  },
  {
    path: '/error',
    method: 'GET',
    controller: (request: HapiRequest) => {
      request.logger.error('Error Message');
      throw new Error('Intentional Error Thrown');
    }
  }
];
