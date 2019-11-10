import { NoteDataservice } from './note.service.js';
import mariadb from '../helpers/mariadb.helper.js';

/** @test {NoteDataservice} */
describe('NoteDataservice', function() {

  /**
   * Question:
   * Should we test that mariadb fetchStub is called? Seems like "white-box" testing, but also
   * we need to stub the query anyways..
   *
   * Maybe we should be testing that note object has properties we expect and dataservice should
   * ensure we return those properties. Flow doesn't check this?
   * Maybe just test things that affect the application output, like if the mariadb helper returns
   * bad values what is response
   */

  /** @test {NoteDataservice.getNote} */
  describe('getNote()', function() {
    let fetchStub;
    beforeEach(function() {
      // Create stubs and fakes here on mariadbhelper, should we create a larger fake object class?
      fetchStub = sinonSandbox.stub(mariadb, 'fetchOne');
    });

    it('should return a note object with matching id', async function() {
      fetchStub.resolves({ id: 1, name: 'abc' });
      const id = 1;

      const result = await NoteDataservice.getNote({ id });

      expect(result).to.contain({ id, name: 'abc' });
    });

    it('should throw error if id is invalid', async function() {
      const promise = NoteDataservice.getNote({ id: 'abc' });

      await expect(promise).to.be.rejected;
    });

    it('should throw error if id doesnt return note', async function() {
      // Hide logging from exception message
      sinonSandbox.stub(console, 'log');

      fetchStub.resolves(undefined);

      const promise = NoteDataservice.getNote({ id: 1 });
      await expect(promise).to.be.rejected;
    });
  });

  /** @test {NoteDataservice.createNote} */
  describe('createNote()', function() {
    it('should return a note with the name passed');
  });

  /** @test {NoteDataservice.createNotes} */
  describe('createNotes()', function() {
    it('should return same number of notes passed to be created');
  });
});
