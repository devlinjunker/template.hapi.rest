/**
 * @flow
 *
 * NOTE: This file will not be included in the esdoc list because it doesn't export any identifiers
 */
import { HapiRequest } from '../base/request/hapi-request.interface.js';
import CONFIG from '../helpers/config.helper.js';
import healthcheckHelper from '../helpers/healthcheck.helper.js';

/**
 * Basic Controller for returning server information
 * @param  {HapiRequest} request Request Parameters
 * @return {Object}         Server information Object
 */
function infoController(request: HapiRequest): any { // eslint-disable-line
  return request.server.info;
}

/**
 * Basic Controller for returning Healthcheck information
 * @param  {HapiRequest} request Request Parameters
 * @return {Object}         Healthcheck response Object
 */
function healthcheckController(request: HapiRequest): any { // eslint-disable-line
  return healthcheckHelper.getStatus(request.params.level);
}

export default [
  {
    path: `${CONFIG.PATHS.healthcheck}/{level?}`,
    method: 'GET',
    controller: healthcheckController
  },
  {
    path: CONFIG.PATHS.info,
    method: 'GET',
    controller: infoController
  }
];
