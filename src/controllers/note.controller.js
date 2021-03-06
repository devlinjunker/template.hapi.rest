/**
 * @flow
 */
import { HapiRequest, HapiHandler } from '../base/request/hapi-request.interface.js';
import NoteDataservice, { Note } from '../dataservices/note.service.js';

/**
 * Container Controller for Note CRUD Functions
 */
export class NoteController {
  /**
   * Returns a note, specified by Id
   * @param  {HapiRequest} request RequestObject
   * @param  {any} handler Hapi Handler object for rejecting/setting errors
   * @return {Note}         Note corresponding to Id passed in
   */
  static async getNoteById({ params }: HapiRequest, handler: HapiHandler): Promise<Note | HapiHandler> {
    try {
      return await NoteDataservice.getNote({ id: params.id });
    } catch (err) {
      // Get resp(HapiHandler) to return http code if number
      const resp: HapiHandler = handler.response({
        message: err.message,
        code: err.code
      });
      if (typeof(err.code) === 'number')  {
        resp.code(err.code);
      } else {
        throw err;
      }
      return resp;
    }
  }

  /**
   * Create a new Note
   * @param  {HapiRequest} request RequestObject
   * @param  {any} handler Hapi Handler
   * @return {Note}        [description]
   */
  static createNote({ payload }: HapiRequest, handler: HapiHandler): Promise<Note | Array<Note>> {
    if (payload.name) {
      return NoteDataservice.createNote({ name: payload.name });
    } else if (Array.isArray(payload)) {
      return NoteDataservice.createNotes(payload);
    } else {
      return handler.response('Missing Note(s) to create').code(500);
    }
  }

  /**
   * Update a note, specified by id
   * @param  {HapiRequest} request RequestObject
   * @return {Note}        [description]
   */
  static updateNote({ payload, logger }: HapiRequest): Promise<Note | HapiHandler> {
    logger.trace({ data: payload });

    // TODO: Actually update / catch error on update

    return NoteDataservice.getNote({ id: payload.id });
  }

  /**
   * Delete a note, specified by id
   * @param  {HapiRequest} request RequestObject
   * @return {boolean}        [description]
   */
  static deleteNote({ params, logger }: HapiRequest): boolean {
    logger.info({ data: params });

    return true;
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
