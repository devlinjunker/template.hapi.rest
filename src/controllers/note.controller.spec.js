import { NoteController } from './note.controller.js';
import { NoteDataservice } from '../dataservices/note.service.js';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

/** @test {NoteController} */
describe('NoteController', () => {
  const sinonSandbox = sinon.sandbox.create();

  describe('getNoteById()', () => {
    it('should return a Note with id given', () => {
      const id = 1;
      sinonSandbox.stub(NoteDataservice, 'getNote').returns({
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
