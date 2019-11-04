/**
 * @flow
 *
 * MariaDB Service Example
 */
import mariadb from '../helpers/mariadb.helper.js';
import { MariaDBInsertResponse } from '../helpers/mariadb.helper.js'; // eslint-disable-line
import { RequestError } from '../base/server.js';

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
  /**
   * Returns a note, specified by the caller by id
   * @param  {number|string} id  `id` number of the Note to retrieve
   * @return {Note}       Note object
   */
  static async getNote({ id }: { id: number }): Promise<Note> {
    if (typeof(id) === 'string' && Number.isNaN(Number.parseInt((id: string)))) {
      throw new RequestError('Note Id must be an integer', 400);
    }
    try {
      const row = await mariadb.fetchOne(`SELECT * FROM test.notes WHERE id=${id}`);

      if (row === undefined) {
        throw new RequestError('Unrecognized Note Id', 404);
      }

      return row;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Creates a new note with a name
   * TODO: add (optional) content param and attribute
   * @param  {String}  name name of note
   * @return {Note}      Note Object
   */
  static async createNote({ name }: { name: string }): Promise<Note> {
    try {
      const response: MariaDBInsertResponse = await mariadb.insert('test.notes', {
        name
      });

      // TODO: Figure out how to debug with atom
      console.log(response);

      return await NoteDataservice.getNote({ id: response.insertId });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Create multiple notes
   * @param  {Array}  notes Array of note objects with name parameter
   * @return {Promise}       [description]
   */
  static async createNotes(notes: Array<{name: string}>): Promise<any> {
    try {
      const insert: MariaDBInsertResponse = await mariadb.insertMultiple('test.notes', notes);

      const endId = insert.insertId + insert.affectedRows;
      const query = `SELECT * from test.notes WHERE id >= ${insert.insertId} AND id < ${endId}`;

      return await mariadb.fetch(query);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
