// import { NoteDataservice } from './note.service.js';
import mariadb from 'mariadb';

/** @test {NoteDataservice} */
describe('NoteDataservice', () => {

  let queryStub;
  beforeEach(() => {
    queryStub = sinonSandbox.stub();
    // TODO: Set up mariadb mock to return connectionStub we can check during tests
    sinonSandbox.stub(mariadb, 'createPool').resolves({
      getConnection: () => {
        return {
          query: queryStub
        };
      }
    });
  });

  /** @test {NoteDataservice.getNote} */
  describe('getNote()', () => {
    it('should return a note object with matching id');

    /**
     * Question:
     * Should we test that mariadb queryStub is called? Seems like "white-box" testing, so probably not
     */
  });

  /** @test {NoteDataservice.createNote} */
  describe('createNote()', () => {
    it('should return a note with the name passed');
  });
});
