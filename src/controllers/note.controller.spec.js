import { NoteController } from './note.controller.js';
import { NoteDataservice } from '../dataservices/note.service.js';

/**
 * Question:
 * Do we want to unit test controllers? If we do openapi based testing with Newman, I think that should
 * cover all of the standard "black-box" expectations of the endpoint.
 * https://github.com/dtzar/openapi-auto-test
 *
 * Seems like we should still unit test with fakes/stubs on the dataservices so we can test before live
 */

/** @test {NoteController} */
describe('NoteController', () => {
  beforeEach(() => {
    // TODO: Stub and Fake NoteDataservice here
  });

  /** @test {NoteController.getNoteById} */
  describe('getNoteById()', () => {
    it('should call NoteDataservice.getNote (with id)', () => {
      const id = 42;
      const getStub = sinonSandbox.stub(NoteDataservice, 'getNote');
      NoteController.getNoteById({ params: { id } });

      expect(getStub).to.be.called;
      /**
       * Question:
       * Should we check what the NoteController passes to backend? Seems too much like "white-box" testing
       */
      expect(getStub).to.be.calledWith({ id });
    });


    /**
     * Question:
     * Is this useful? Or should we just check that it calls the backend dataservice?
     *
     * Maybe we should use Model classes for objects returned from service, so we can instantiate in
     * the fakes/returns we stub
     */
    it('should return a Note with id passed', () => {
      const id = 1;
      sinonSandbox.stub(NoteDataservice, 'getNote').returns({
        id
      });

      const note = NoteController.getNoteById({ params: { id } });

      expect(note).to.contain({ id });
    });

    it('should return error message if id is invalid');

    it('should return error message if Note doesn\'t exist');
  });

  /** @test {NoteController.createNote} */
  describe('createNote()', () => {
    it('should call DataService.createNote (with newName?)', async() => {
      const createNoteStub = sinonSandbox.stub(NoteDataservice, 'createNote');

      const newNoteName = 'abc';
      await NoteController.createNote({ payload: { name: newNoteName } });

      expect(createNoteStub).to.be.called;
      expect(createNoteStub).to.be.calledWith({ name: newNoteName });
    });

    it('should return note with name passed and new id', async() => {
      const id = 13;
      sinonSandbox.stub(NoteDataservice, 'createNote').callsFake(({ name }) => {
        return {
          id,
          name
        };
      });

      const newNoteName = 'abc';
      const note = await NoteController.createNote({ payload: { name: newNoteName } });

      expect(note).to.deep.equal({
        id,
        name: newNoteName
      });
    });

    it('should return error if note name is empty');

    it('should return error message if error creating note');
  });

  /** @test {NoteController.updateNote} */
  describe('updateNote()', () => {
    it('should call NoteDataservice.updateNote (with params)');

    it('should return note with updated name, as passed');

    it('should return error message if id is invalid');

    it('should return error message if error updating note');
  });

  /** @test {NoteController.deleteNote} */
  describe('deleteNote()', () => {
    it('should call NoteDataservice.deleteNote (with id)');

    it('should return the deleted note id');

    it('should return error message if id is invalid');

    it('should return error message if error deleting note');
  });
});
