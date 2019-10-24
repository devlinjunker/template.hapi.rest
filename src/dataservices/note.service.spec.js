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

  describe('getNote()', () => {
    it('should return a note object with matching id');
  });

  describe('createNote()', () => {
    it('should return a note with the name passed');
  });
});
