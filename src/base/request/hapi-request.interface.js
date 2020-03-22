/**
 * @flow
 */
/* eslint-disable flowtype/no-weak-types */

/**
* Request Object that is passed to the controller function as the first parameter
* from https://github.com/hapijs/hapi/blob/master/API.md#request
* @type {HapiRequest}
*/
export interface HapiRequest {
  server: any;
  headers: any;
  // from path
  params: any;
  // Body of a POST request
  payload: any;
  logger: any;
};


/**
 * Hapi Handler for returning messages or setting error codes during requests
 * @type {HapiHandler}
 */
export interface HapiHandler {
  code: Function;
  response: Function;
  redirect: Function;
}
