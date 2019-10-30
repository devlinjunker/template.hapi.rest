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

/**
 * Response from MariaDB Insert statement (From MariaDB)
 * @type {MariaDBInsertResponse}
 */
interface MariaDBInsertResponse {
  affectedRows: number;
  insertId: number;
  warningStatus: number;
}

/**
 * MariaDB Helper for easy access to a configured MySQL Connection, with consistent methods for simple
 * interactions and larger transactions.
 *
 * This class can also be instantiated pointing elsewhere with a different MariaDBConfig passed to the
 * constructor
 * @type {MariaDBHelper}
 */
export class MariaDBHelper {
  /**
   * MariaDB Pool API
   * @type {PoolApi} https://mariadb.com/kb/en/library/connector-nodejs-promise-api/#pool-api
   */
  dbPool: any;

  /**
   * Creates a new Helper (on this file export starts the Database Pool)
   * @param {MariaDBConfig} config                Configuration to Connect to MySQL Database
   * @param {MariaDB.Connection} transactionConnection MariaDB Connection to use for larger transactions
   */
  constructor({ config, transactionConnection }: { config?: MariaDBConfig, transactionConnection?: any }) {
    // NOTE: Not sure if this is better, or if we should just make sure to always call `shutdown` to close db
    // If testing, skip any startup
    if (process.argv.includes('--env.unit_test')) {
      return;
    }

    if (config) {
      // Instantiating a connection to a different server
      this.dbPool = mariadb.createPool(config);
    } else if (transactionConnection) {
      // For Larger Transaction
      // TODO: Finish up transactionConnection Helper
    } else {
      // TODO: Log on failure to create MariaDB Helper
      throw new Error('MariaDBHelper created without DB Config or connection to use');
    }
  }

  /**
   * Shuts down the mariadb connections
   * @param  {Function} callback callback function to call after shutting down db connections
   * @return {undefined}            no return
   */
  shutdown(callback: Function) {
    if (this.dbPool) {
      this.dbPool.end((err) => {
        if (err) {
          // TODO: Do Something on MariaDB Shutdown error
        }
        callback(err);
      });
    }
  }

  /**
   * Fetch all rows given a query string and values that can qualify the query
   * @param  {string}  query  Query string to pass to mariadb
   * @return {Promise}        Return array of values
   */
  async fetch(query: string): Promise<Array<any>> {
    // TODO: Verify that query contains `SELECT`

    const response = await this.query(query);

    if (!response || response.length === 0) {
      return [];
    }
    return response;
  }

  /**
   * Fetch the (first) row that matches a string
   * @param  {string}  query  Query string to pass to mariadb
   * @return {Promise}        Returns a single value
   */
  async fetchOne(query: string): Promise<any> {
    const response = await this.fetch(query);

    if (!response || response.length === 0) {
      return undefined;
    }

    return response[0];
  }

  /**
   * Insert an Object into a specific table
   * @param  {String}  table  Name of table to insert object into
   * @param  {Object}  object Mapping from column names to values to insert into DB Table
   * @return {Promise<MariaDBInsertResponse>}        Response from MariaDB
   */
  async insert(table: string, object: Object): Promise<MariaDBInsertResponse> {
    const keyString: string = Object.keys(object).join(', '); // {'abc': 1, 'def', 2 } => 'abc, def'
    const values: Array<any> = Object.values(object); // [1, 2]
    const inserts: string = '?,'.repeat(values.length).slice(0, (values.length * 2) - 1); // '?, ?'

    const response: MariaDBInsertResponse = await this.query(
      `INSERT INTO ${table} (${keyString}) value (${inserts})`,
      values
    );

    return response;
  }

  /**
   * Execute a simple query on the entire database
   * @param  {string}  query Query string to be passed to DB for response
   *  see https://mariadb.com/kb/en/library/data-manipulation/ for reference
   * @param  {Array<any>}      values Array of values to inject into the query string, matching the number of
   *  placeholders given
   * @return {Promise}        Returns the response from the query
   */
  query(query: string, values?: Array<any>): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      // TODO: use transaction connection if it exists (this is what makes this so versatile)
      this.dbPool.query(query, values).then((ret: any) => {
        if (!ret) {
          // TODO: Log Query no values
          resolve(undefined);
          return;
        }
        resolve(ret);
      }).catch((err: Error) => {
        if (err) {
          // TODO: Log Query Error
          reject(err);
          return;
        }
      });
    });
  }
}

// TODO: get MariaDB settings from conf/config.yaml
/**
 * Exported MariaDB Helper tha uses configuration
 * @type {MariaDBHelper}
 */
const mariadbHelper = new MariaDBHelper({ config: {
  host: 'localhost',
  user: 'root',
  password: 'root',
  connectionLimit: 5
} });

export default mariadbHelper;
