/**
 * @flow
 */
import mariadb from 'mariadb';

/**
 * Note object with name and id
 * @type {Note}
 */
export interface Note {
  id: number;
  name: string;
};

/**
 * Note Dataservice for interacting with the storage system for saving notes
 */
export class NoteDataservice {
  static dbPool: any;

  /**
   * Static Constructor to create database connection
   * @returns {undefined}
   */
  static constructor() {
    if (NoteDataservice.dbPool === undefined) {
      // TODO: Configuration from file
      NoteDataservice.dbPool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        connectionLimit: 5
      });
    }
  }

  /**
   * Returns a note, specified by the caller by id
   * @param  {number|string} id  ID number of the Note to retrieve
   * @return {Note}       Note object
   */
  static async getNote({ id }: { id: number | string }): Promise<Note> {
    let connection;
    try {
      connection = await NoteDataservice.dbPool.getConnection();

      const rows = await connection.query(`SELECT * FROM test.notes WHERE id=${id}`);

      return rows;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      if (connection) {
        connection.end();
      }
    }
  }
}
NoteDataservice.constructor();
