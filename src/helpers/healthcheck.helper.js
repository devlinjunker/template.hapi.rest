/**
 * @flow
 */
import _ from 'lodash';
import http from 'http';
import CONFIG, { DatabaseConfig, ExternalServiceConfig } from './config.helper.js';
import { MariaDBHelper } from './mariadb.helper.js';
import pack from '../../package.json';
import file from 'fs';
import path from 'path';

/**
 * Healthcheck Response Object containing the healthcheck name, status and if it errored or not
 * @type {HealthcheckResponse}
 */
interface HealthcheckResponse {
  name: string | typeof undefined;
  status: any;
  error?: boolean;
};

/**
 * Retrieves the status of a database, based on the config given
 * @param  {DatabaseConfig} config config of database to check
 * @return {HealthcheckResponse}     Response from Database Healtcheck
 */
async function _getDatabaseStatus(config: DatabaseConfig): Promise<HealthcheckResponse> {
  const response: HealthcheckResponse = {
    name: config.serviceName,
    status: undefined
  };
  try {
    const helper: MariaDBHelper = new MariaDBHelper({
      config: _.merge(config, {
        connectionLimit: 1
      })
    });
    const status: string | boolean = await helper.getStatus();
    response.status = JSON.stringify(status);
    helper.shutdown();
  } catch (error) {
    response.error = true;
    response.status = error;
  }

  return response;
}

/**
 * Retrieves the status of an external service via http request to an endpoint, based on config given
 * @param       {ExternalServiceConfig} config config of external service
 * @return      {HealthcheckResponse}     Response from Database Healtcheck
 */
async function _getExternalServiceStatus(config: ExternalServiceConfig): Promise<HealthcheckResponse> {
  const endpoint: string = config.protocol + '://' + config.host + ':' +
    _.get(config.healthcheck, 'port', config.port) + _.get(config.healthcheck, 'path', config.path);

  const promise = new Promise((resolve, reject) => { // eslint-disable-line
    const req = http.get(endpoint, (response) => { // eslint-disable-line
      response.on('data', (data: string) => {
        resolve(data);
      });
    });
    // TODO: Set Timeout length from Config (per service or have default?)
    req.setTimeout(5000, () => {
      req.destroy();
      reject('Error: Timeout at ' + endpoint);
    });
    req.on('error', (error: Error) => {
      reject(error);
    });
  });

  const response: HealthcheckResponse = {
    name: config.serviceName,
    status: undefined
  };
  try {
    response.status += await promise;
  } catch (error) {
    response.error = true;
    response.status = error;
  }
  return response;
}

/**
 * Returns the current branch of the build (TODO: development vs production?)
 * @return {string} information about the current branch and build
 */
function getBranch(): string {
  const content: string = file.readFileSync(path.join(__dirname, '../../.git/HEAD'), { encoding: 'UTF-8' });

  const split: string[] = content.split('/');
  return split[split.length - 1];
}

/**
 * Class to wrap the methods that are used for server healthcheck
 */
class HealthcheckHelper {
  // Tried these with ES6 Map type but it made it much harder to do easy JSON manipulations
  serviceMap: { [name: string]: ExternalServiceConfig };
  dbMap: { [name: string]: DatabaseConfig };

  /**
   * Creates the Healthcheck helper by loading the configuration file and parsing the database and external
   * service configurations
   */
  constructor() {
    this.serviceMap = {};
    this.dbMap = {};
    _.each(CONFIG.EXTERNAL_SERVICES, (service: ExternalServiceConfig, name: string) => {
      if (service.serviceName === undefined) {
        service.serviceName = name;
      }
      this.serviceMap[name] = service;
    });

    _.each(CONFIG.DB, (service: DatabaseConfig, name: string) => {
      if (service.serviceName === undefined) {
        service.serviceName = name;
      }
      this.dbMap[name] = service;
    });
  }

  /**
   * Returns whether the service passed is running
   * @param  {string}  serviceName name of the service/database to check is running
   * @return {Boolean}             whether or not the service returns it is healthy
   */
  async isRunning(serviceName: string): Promise<HealthcheckResponse | false> {
    const conf: DatabaseConfig | ExternalServiceConfig = this.serviceMap[serviceName];
    // TODO: don't check if it exists, check if it is actually running
    if (conf !== undefined) {
      if (conf instanceof DatabaseConfig) {
        return await _getDatabaseStatus(conf);
      } else {
        return await _getExternalServiceStatus(conf);
      }
    }

    return false;
  }

  /**
   * Returns the status
   * @param {String} level of healthcheck status to view
   *  L1: this server + version
   *  L2: databases and other essential services we manage for the endpoints to work
   *  L3: external services we don't have control over and hopefully we catch errors for to explain to user
   * @returns {any} status of services in that level (or full status of server if no level provided)
   */
  async getStatus(level?: 'L1' | 'L2' | 'L3'): any {
    /* eslint-disable id-length */
    const status = {
      L1: [
        {
          name: 'SERVER',
          status: 'alive',
        },
        {
          name: 'VERSION',
          status: pack.version
        },
        {
          name: 'BRANCH',
          status: getBranch()
        }
      ],
      L2: await Promise.all(_.map(this.dbMap, _getDatabaseStatus)),
      L3: await Promise.all(_.map(this.serviceMap, _getExternalServiceStatus))
    };
    /* eslint-enable id-length */

    return level === undefined ? status : status[level];
  }
}

/**
 * Exported Helperto interact with Healcheck Operations
 * @type {Healthcheck}
 */
const healthcheckHelper: HealthcheckHelper = new HealthcheckHelper();
export default healthcheckHelper;
