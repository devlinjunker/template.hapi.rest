/**
 * @flow
 */

/**
 * Note Dataservice for interacting with the storage system for saving notes
 */
export default class NoteDataservice {
  static datastore: any;

  /**
   * Returns a note, specified by the caller by id
   * @param  {number|string} id  ID number of the Note to retrieve
   * @return {Note}       Note object
   */
  static getNote({ id }: { id: number | string }): any {
    return NoteDataservice.datastore.get(id);
  }
}
