# Template Hapi Server Project

Node Project setup using Hapi to handle requests on a port to endpoints

`base/server` does all of the Hapi Server configuration and startup, and contains methods for adding the endpoints  
`controllers` files declare the endpoints and functions that are called.  
`entry.js` references these controller files and passes them to the server object that is instantiated in the same file  


To compile to output directory `./dist/`, use `npm run build`  
To clean up and delete the output directory, use `npm run clean`  

To start the server, use `npm run start`  

### Babel
Babel is used to ensure ECMA2015 standards can be used in the javascript files
 (let/const, destructuring, default params, restParams [...args], templates).
Also has a babel preset for flow so that it works correctly

TODO: Look into stage-0, seems like we should remove it

### Flow
Static Type Checking with Flow, runs through type checking on any file with `//@flow` comment at beginning

Read more at https://flow.org/docs/usage/ about how to use flow or https://flow.org/en/docs/ for more documentation

Run with `npm run flow` to check if any flow errors

### Linting
ESLint for code linting to ensure consistent coding conventions are met.

Run with `npm run lint` to check if any files with unmatched code conventions.  
Can also fix with `npm run lintfix` to automatically attempt to fix the linting errors in the code files.

`.eslintrc.json` contains the rules for the code conventions

##### Code Conventions:
- Indent 2 spaces  
- Unix Linebreak  
- Double Quotes  
- Require Semi-colons
- Warn of console.log statements  
[ ] TODO: Single Quote?  
[ ] TODO: No Trailing space  
[ ] TODO: No Trailing Lines  
[ ] TODO: No Double Empty Lines  

### Testing
Mocha + Chai for assertions are used as the testing framework in this example. Mocha is stripped down
and we need to add things like chai assertions and sinon back to the mix to get full features. Run with
`npm run test` or `npm test`

NYC is used for coverage reports, use `npm run test-report` to see the coverage report for unit tests

TODO: Include Sinon for stubbing/spying in tests

### Documentation
Documentation with esdoc, goes through javascript files and builds javadoc type html documentation for
each Class in the source code. Can also link test files with classes for reference. This is output as
html in the `./doc/` directory and can be viewed by opening the index.html file

Update documentation with `npm run doc`

#### Things to do:

1 2 [ ] Webpack  
1 1 [ ] Chai as promised and sinon-chai  
1 3 [ ] OpenAPI (Swagger) Documentation and ESDoc Plugin https://swagger.io/docs/specification/about/  
1 2 [ ] OpenAPI Validation 
1 3 [ ] Simple MongoDB endpoint
2 1 [ ] Review/Add More Linting Rules (linewrap, length, etc)  
2 1 [ ] ESLint ensuring files start with a comment https://github.com/Stuk/eslint-plugin-header  
2 1 [ ] Require Comments https://eslint.org/docs/rules/require-jsdoc and valid https://eslint.org/docs/rules/valid-jsdoc  
2 2 [ ] Automatically find controller files in entry rather than need to reference  
2 2 [ ] Add logging with Winston  
2 3 [ ] Headers  
2 2 [ ] Run only affected tests on file save  
2 3 [ ] Githooks for generating reports/linting  
3 3 [ ] ESDoc plugins https://medium.com/trabe/understanding-esdoc-plugins-d9ee9095d98b  
3 3 [ ] Cucumber.js for BDD(Behavior Driven Development) testing http://cucumber.github.io/cucumber-js/  
3 2 [ ] Test coverage saved in spec files  
3 1 [ ] Babel Istanbul(NYC) plugin https://github.com/istanbuljs/babel-plugin-istanbul  
3 2 [ ] Istanbul (NYC) Reporters https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib  
3 3 [ ] Authorized vs Unauthorized endpoints  
3 1 [x] ESDoc Manual https://doc.esdoc.org/github.com/esdoc/esdoc/manual/feature.html#integration-manual  
3 3 ~~[ ] Docsify?~~  

#### Later:
[ ] SSO Server (multiple servers connecting to one authorization server)
