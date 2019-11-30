import { HelloWorld } from './hello.controller.js';

/** @test {HelloWorld} */
describe('HelloWorld', function() {
  /** @test {HelloWorld.basic} */
  describe('basic()', function() {
    it('returns \'Hello World!\'', function() {
      const returned = HelloWorld.basic();

      expect(returned).to.equal('Hello World!');
    });
  });

  /** @test {HelloWorld.name} */
  describe('name()', function() {
    it('returns \'{request.params.name} says:\'', function() {
      const request = {
        params: {
          name: 'Devlin'
        }
      };

      let returned = HelloWorld.name(request);
      expect(returned.startsWith('Devlin says')).to.be.true;

      request.params.name = 'Michelle';

      returned = HelloWorld.name(request);
      expect(returned.startsWith('Michelle says')).to.be.true;
    });
  });
});
