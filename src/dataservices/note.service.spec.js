import { NoteDataservice } from './note.service.js';
import mariadb from '../helpers/mariadb.helper.js';

/** @test {NoteDataservice} */
describe('NoteDataservice', () => {

  let fetchStub;
  beforeEach(() => {
    fetchStub = sinonSandbox.stub(mariadb, 'fetchOne');
  });

  /** @test {NoteDataservice.getNote} */
  describe('getNote()', () => {
    /**
     * Question:
     * Should we test that mariadb fetchStub is called? Seems like "white-box" testing, but also
     * we need to stub the query anyways..
     *
     * TODO: Maybe we should be testing that note object has properties we expect and dataservice should
     * ensure we return those properties
     */
    it('should return a note object with matching id', async() => {
      fetchStub.resolves({ id: 1, name: 'abc' });
      const id = 1;

      const result = await NoteDataservice.getNote({ id });

      expect(result).to.deep.equal({ id, name: 'abc' });
    });

    it('should throw error if id is invalid');

    it('should throw error if id doesnt return note');
  });

  /** @test {NoteDataservice.createNote} */
  describe('createNote()', () => {
    it('should return a note with the name passed');
  });
});
