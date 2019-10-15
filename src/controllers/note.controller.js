/**
 * @flow
 *
 * @type NoteController
 */
// // TODO: Remove this
/* eslint-disable no-unused-vars */

import NoteDataservice from 'app/dataservices/note.service.js';

/**
 * Container Controller for Note CRUD Functions
 */
class NoteController {
  /**
   * Returns a note, specified by Id
   * @param  {HapiRequest} request [description]
   * @return {Note}         [description]
   */
  static getNoteById({ params }: { params: any }): boolean {
    console.log(params);

    return true;
  }

  /**
   * Create a new Note
   * @param  {[type]} params [description]
   * @return {Note}        [description]
   */
  static createNote({ params }: any) {

  }

  /**
   * Update a note, specified by id
   * @param  {[type]} params [description]
   * @return {Note}        [description]
   */
  static updateNote({ params }: any) {

  }

  /**
   * Delete a note, specified by id
   * @param  {[type]} params [description]
   * @return {boolean}        [description]
   */
  static deleteNote({ params }: any) {

  }
}

export default [
  {
    path: '/note/{id}',
    method: 'GET',
    controller: NoteController.getNoteById
  },
  {
    path: '/note',
    method: 'POST',
    controller: NoteController.createNote
  },
  {
    path: '/note/{id?}',
    method: 'PUT',
    controller: NoteController.updateNote
  },
  {
    path: '/note/{id}',
    method: 'DELETE',
    controller: NoteController.deleteNote
  }
];