/**
 * @flow
 *
 * @type HelloWorldController
 */

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
  static name(request: any): string {

    const name = request.params.name;

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
  }
];
