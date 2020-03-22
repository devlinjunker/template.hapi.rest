/**
 * @flow
 *
 * MariaDB Service Example
 */
import mariadbHelper, { MariaDBInsertResponse } from '../helpers/mariadb.helper.js'; // eslint-disable-line
import { RequestError } from '../base/server.js';
import _ from 'lodash';

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
export default class NoteDataservice {
  /**
   * Returns a note, specified by the caller by id
   * @param  {number|string} id  `id` number of the Note to retrieve
   * @return {Note}       Note object
   */
  static async getNote({ id }: { id: number }): Promise<Note> {
    if (typeof(id) === 'string' && Number.isNaN(Number.parseInt((id: string)))) {
      throw new RequestError('Note Id must be an integer', 400);
    }
    const row: Note = await mariadbHelper.fetchOne(`SELECT * FROM test.notes WHERE id=${id}`);

    if (row === undefined) {
      throw new RequestError('Unrecognized Note Id', 404);
    }

    return row;
  }

  /**
   * Creates a new note with a name
   * TODO: add (optional) content param and attribute
   * @param  {String}  name name of note
   * @return {Note}      Note Object
   */
  static async createNote({ name }: { name: string }): Promise<Note> {
    if (name === '' || name === undefined) {
      throw new RequestError('Name must be provided', 404);
    }

    const response: MariaDBInsertResponse = await mariadbHelper.insert('test.notes', {
      name
    });

    // TODO: Debug with atom?
    // TODO: Use Logger helper instead
    console.log(response);

    return await NoteDataservice.getNote({ id: response.insertId });
  }

  /**
   * Create multiple notes
   * @param  {Array}  notes Array of note objects with name parameter
   * @return {Promise}       [description]
   */
  static async createNotes(notes: Array<{name: string}>): Promise<Array<Note> | Note> {
    if (
      _.find(({ name }: { name: string; }): boolean => {
        return name === '' || name === undefined;
      }) !== undefined
    ) {
      throw new RequestError('Name cannot be empty or undefined', 404);
    }
    const insert: MariaDBInsertResponse = await mariadbHelper.insertMultiple('test.notes', notes);

    const endId: number = insert.insertId + insert.affectedRows;
    const query: string = `SELECT * from test.notes WHERE id >= ${insert.insertId} AND id < ${endId}`;

    return await mariadbHelper.fetch(query);
  }
}
