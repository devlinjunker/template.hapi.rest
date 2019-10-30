/**
 * @flow
 */
import mariadb from 'mariadb';

/**
 * Configuration for MariaDBHelper Database connection
 * @type {MariaDBConfig}
 */
export interface MariaDBConfig {
  host: string;
  user: string;
  password: string;
  connectionLimit: number;
};

// From MariaDB
// interface InsertMariaDBResponse {
//   affectedRows: number;
//   insertId: number;
//   warningStatus: number;
// }

/**
 * MariaDB Helper for easy access to a configured MySQL Connection, with consistent methods for simple
 * interactions and larger transaction.
 * This class can also be instantiated pointing elsewhere with a different MariaDBConfig passed to the
 * constructor
 * @type {MariaDBHelper}
 */
export class MariaDBHelper {
  dbPool: any;

  /**
   * Creates a new Helper (on this file export starts the Database Pool)
   * @param {MariaDBConfig} config                Configuration to Connect to MySQL Database
   * @param {MariaDB.Connection} transactionConnection MariaDB Connection to use for larger transactions
   * (get passed back to transaction callback)
   */
  constructor({ config, transactionConnection }: { config?: MariaDBConfig, transactionConnection?: any }) {
    // If testing, skip any startup
    // NOTE: Not sure if this is better, or if we should just make sure to always call `shutdown` to close db
    if (process.argv.includes('--env.unit_test')) {
      return;
    }

    if (config) {
      // Instantiating a connection to a different server
      this.dbPool = mariadb.createPool(config);
    } else if (transactionConnection) {
      // For Larger Transaction
    } else {
      // TODO: Log on failure
      throw new Error('MariaDBHelper created without DB Config or connection to use');
    }
  }

  /**
   * Execute a simple query on the entire database
   * @param  {string}  query Query string to be passed to DB for response
   * @param  {any}      values Values to inject in the
   * @return {Promise}        Returns the response from the query
   */
  query(query: string, values: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      // TODO: use transaction connection if it exists (this is what makes this so versatile)
      this.dbPool.query(query, values).then((ret: any) => {
        if (!ret) {
          // TODO: Log
          resolve(undefined);
          return;
        }
        resolve(ret);
      }).catch((err: Error) => {
        if (err) {
          // TODO: Log
          reject(err);
          return;
        }
      });
    });
  }
}

/**
 * Exported MariaDB Helper tha uses configuration
 * TODO: from conf/config.yaml
 * @type {MariaDBHelper}
 */
const mariadbHelper = new MariaDBHelper({ config: {
  host: 'localhost',
  user: 'root',
  password: 'root',
  connectionLimit: 5
} });

export default mariadbHelper;
