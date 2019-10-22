/**
 * @flow
 *
 * NOTE: This file will not be included in the esdoc list because it doesn't export any identifiers
 */
import { HapiRequest } from '../base/server.js';

/**
 * Basic Controller for returning server information
 * @param  {HapiRequest} request Request Parameters
 * @return {Object}         Server information Object
 */
function controller(request: HapiRequest): any { // eslint-disable-line
  return request.server.info;
}

export default [
  {
    path: '/info',
    method: 'GET',
    controller
  }
];
