/* eslint-disable no-undef */
const requireContext = require('require-context');
import mocha from 'mocha';
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.use(chaiAsPromised);
global.describe = mocha.describe;
global.it = mocha.it;
global.beforeEach = mocha.beforeEach;
global.expect = chai.expect;
global.sinonSandbox = sinon.createSandbox();

// $FlowFixMe
const testsContext = requireContext('../../src', true, /.spec$/);

testsContext.keys().forEach(testsContext);

afterEach(() => {
  sinonSandbox.restore();
});
