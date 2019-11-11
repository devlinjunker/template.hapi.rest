/* eslint-disable no-undef  */
import mocha from 'mocha';
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

const requireContext = require('require-context');

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

/* eslint-disable mocha/no-top-level-hooks, mocha/no-hooks-for-single-case */
afterEach(function() {
  sinonSandbox.restore();
});
