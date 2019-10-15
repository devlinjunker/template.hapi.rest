/**
 * @flow
 */

/**
 * Note Dataservice for interacting with the storage system for saving notes
 */
class NoteDataservice {
  datastore: any;

  /**
   * Returns a note, specified by the caller by id
   * @param  {number} id  ID number of the Note to retrieve
   * @return {Note}       Note object
   */
  getNote({ id }): any {
    return this.datastore.get(id);
  }
}


export default new NoteDataservice();
