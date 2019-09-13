# Basic Webpack Server App

This is meant to be an example/template of how to use Webpack in the Backend for rapid development.

Simple endpoints that store and retrieve values


## Dependencies
Node v8 and npm

See [package.json](https://github.com/devlinjunker/basic.webpack/blob/master/package.json) for full list of current dependencies
 - Hapi v18
 - Webpack + Loaders
 - Babel
 - FlowJS
 - ESLint
 - Mocha ~~Chai, Sinon~~
 - EsDoc

## Development

How to use this template to create a quick HTTP REST server:

1. Download and update dependencies

### Tests/Running

`npm run start-watch` to run Karma + Mocha and watch for changes while also opening the server. Webpack will recompile the project and restart the server when it is done

`npm run test-watch` TODO: to run Karma + Mocha and all of the tests associated with the project and watch for changes on the files to re-run the tests

`npm run dev-watch` to run the only webpack and watch for changes on the files to recompile and reload the server

`npm run test-dev` ??

`npm run test` to run all of the unit tests for the application one time

`npm run dev` ?? to run a development version of the application

`npm run doc` to generate static documentation in the doc folder

**TODO**

`npm run build` ... TODO: compile application to production version

`npm run clean` ... TODO: clean the workspace



### TODO

 - [..] (^) require node 8
 - [..] (^) Webpack  
    - https://medium.com/@christossotiriou/speed-up-nodejs-server-side-development-with-webpack-4-hmr-8b99a932bdda  
    - [x] babel
      - [x] sourcemap support
      - https://www.npmjs.com/package/babel-plugin-source-map-support#description
    - [x] flow webpack plugin - typechecking each compilation
    - [x] eslinting  
    - [ ] tests with karma
    - [ ] nodemon to run server
    - [ ] (v) production vs dev
 - [ ] (^) Update Linting Rules (linewrap, length, etc)  
    - [ ] ensuring files start with a comment https://github.com/Stuk/eslint-plugin-header  
    - [ ] Require Comments https://eslint.org/docs/rules/require-jsdoc and valid https://eslint.org/docs/rules/valid-jsdoc  
    - [ ] Headers  
 - [ ] (^) Update Node Version to v10
 - [ ] (^) Chai as promised and sinon-chai  
 - [ ] (^) OpenAPI (Swagger) Documentation and ESDoc Plugin https://swagger.io/docs/specification/about/  
 - [ ] (^) OpenAPI Validation  
 - [ ] (^) Simple MongoDB endpoint  
 - [ ] (^) Cofig.yaml and Env config file
     - [ ] port
     - [ ] other services/apis later?
 - [ ] (-) Automatically find controller files in entry rather than need to reference  
 - [ ] (-) Add logging with Winston/Bunyon  
 - [ ] (-) Run only affected tests on file save  
 - [ ] (-) Githooks for generating reports/linting  
 - [ ] (v) ESDoc plugins https://medium.com/trabe/understanding-esdoc-plugins-d9ee9095d98b  
 - [ ] (v) Cucumber.js for BDD(Behavior Driven Development) testing http://cucumber.github.io/cucumber-js/  
 - [ ] (v) Test coverage saved in spec files  
 - [ ] (v) Babel Istanbul(NYC) plugin https://github.com/istanbuljs/babel-plugin-istanbul  
 - [ ] (v) Istanbul (NYC) Reporters https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib  
 - [ ] (v) Authorized vs Unauthorized endpoints  
 - [x] (v) ESDoc Manual https://doc.esdoc.org/github.com/esdoc/esdoc/manual/feature.html#integration-manual  
 - ~~[ ] Docsify?~~  
