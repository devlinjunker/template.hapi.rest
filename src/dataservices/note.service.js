/**
 * @flow
 *
 * MariaDB Service Example
 * TODO: Look into proper conventions and practice for opening/closing db and connections
 */
import mariadb from 'mariadb';

// From MariaDB
interface InsertMariaDBResponse {
  affectedRows: number;
  insertId: number;
  warningStatus: number;
}

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
   * @param  {number|string} id  `id` number of the Note to retrieve
   * @return {Note}       Note object
   */
  static async getNote({ id }: { id: number | string }): Promise<Note> {
    let connection;
    try {
      connection = await NoteDataservice.dbPool.getConnection();

      const rows = await connection.query(`SELECT * FROM test.notes WHERE id=${id}`);

      return rows[0];
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      if (connection) {
        connection.end();
      }
    }
  }

  /**
   * Creates a new note with a name
   * TODO: add (optional) content param and attribute
   * @param  {String}  name name of note
   * @return {Note}      Note Object
   */
  static async createNote({ name }: { name: string }): Promise<Note> {
    let connection;
    try {
      connection = await NoteDataservice.dbPool.getConnection();

      const response: InsertMariaDBResponse = await connection.query(
        'INSERT INTO test.notes (name) VALUES (?)',
        name
      );

      // TODO: Figure out how to debug with atom
      console.log(response);

      return await NoteDataservice.getNote({ id: response.insertId });
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
// Not sure if I like this pattern... maybe a reason to instantiate a dataservice and export it
NoteDataservice.constructor();
