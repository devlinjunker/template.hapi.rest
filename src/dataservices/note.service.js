/**
 * @flow
 *
 * MariaDB Service Example
 */
// import mariadb from 'mariadb';
import mariadb from '../helpers/mariadb.helper.js';

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
    try {
      const rows = await mariadb.fetchOne(`SELECT * FROM test.notes WHERE id=${id}`);

      return rows;
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
      const response = await mariadb.insert('test.notes', {
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
}
