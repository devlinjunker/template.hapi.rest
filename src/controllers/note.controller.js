/**
 * @flow
 */
// // TODO: Remove this
/* eslint-disable no-unused-vars */
import { HapiRequest } from 'app/base/server.js';
import NoteDataservice from 'app/dataservices/note.service.js';

/**
 * Container Controller for Note CRUD Functions
 */
export class NoteController {
  /**
   * Returns a note, specified by Id
   * @param  {HapiRequest} request RequestObject
   * @return {Note}         Note corresponding to Id passed in
   */
  static getNoteById({ params }: HapiRequest): boolean {
    console.log(params);

    return true;
  }

  /**
   * Create a new Note
   * @param  {[type]} params [description]
   * @return {Note}        [description]
   */
  static createNote({ params }: HapiRequest) {

  }

  /**
   * Update a note, specified by id
   * @param  {[type]} params [description]
   * @return {Note}        [description]
   */
  static updateNote({ params }: HapiRequest) {

  }

  /**
   * Delete a note, specified by id
   * @param  {[type]} params [description]
   * @return {boolean}        [description]
   */
  static deleteNote({ params }: HapiRequest) {

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
