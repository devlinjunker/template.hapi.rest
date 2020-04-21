# Test

Testing bootstrap file([github](https://github.com/devlinjunker/template.hapi.rest/blob/master/test/test.bootstrap.js))
finds all of the test files and imports global objects that can be used in all tests to simplify each test
file. Also creates a sinon Sandbox that is reset before each test for mocking/stubbing services and non-tested
functions in the test context.

To run the tests with mocha, use `npm run test` to see the output from all tests in `.spec` files in the
standard output.


Global Imports (available in all `.spec` files):
 - `sinonSandbox` from [Sinon](https://sinonjs.org/)
 - `expect` from [Chai](https://www.chaijs.com/)
 - `describe`/`it`/`beforeEach` from [Mocha](https://mochajs.org/)


## Notes/Ideas
  - [ ] Look into differences between webpack tests vs `npm test`
  - **IDEA:** Mocha settings/plugin for displaying filepath in output of tests (when erroring?)
    - seems difficult to do on async/timeout errors
