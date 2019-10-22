import { NoteController } from './note.controller.js';
import { NoteDataservice } from '../dataservices/note.service.js';

/** @test {NoteController} */
describe('NoteController', () => {

  describe('getNoteById()', () => {
    it('should return a Note with id given', () => {
      const id = 1;
      sandbox.stub(NoteDataservice, 'getNote').returns({
        id
      });

      const note = NoteController.getNoteById({ params: { id } });

      expect(note).to.contain({ id });
    });
  });

  describe('createNote()', () => {

  });

  describe('updateNote()', () => {

  });

  describe('deleteNote()', () => {

  });
});
