# Basic Webpack Server App

This is meant to be an example/template of how to use Webpack in the Backend for rapid development.

TODO: Simple endpoints that store and retrieve values


## Dependencies
Node v8+ and npm
  (tested with node v8.12.0 and v10.15.1)

See [package.json](https://github.com/devlinjunker/template.node.hapi/blob/master/package.json) for full list of current dependencies
 - Hapi v18
 - Webpack + Loaders
 - Babel
 - FlowJS
 - ESLint
 - Mocha, Chai, Sinon
 - EsDoc

## Development

How to use this template to create a quick HTTP REST server:

1. Download and update dependencies
2. Add new OpenAPI endpoint to `openapi.yaml`
3. Add Unit tests in `src/controllers/` (Test Driven Development)
4. Add Controller Files to `src/controllers/`
  - For now, add reference to controller in `src/entry.js` (with other controllers)
5. Run `npm run start-watch` to compile and run server + tests in watch mode
6. Navigate to http://localhost:3333/docs/swagger/index.html to see swagger-ui with your new endpoint

### Tests/Running

`npm run start-watch` to run open the server and run Webpack to watch for changes, recompiling, running the tests and restarting the server when it is done

`npm run test-watch` to run Mocha and with all tests associated with the project, watch for changes on the files to re-run the tests

`npm run dev-watch` to run only webpack and watch for changes on the files to recompile and reload the server

`npm run test` to run all of the unit tests for the application one time

`npm run dev` to run a development version of the server

`npm run build` to compile development version of server to `dist/`

`npm run doc` to generate static documentation in the doc folder

`npm run lint` to run linter and see any errors/warnings

`npm run clean` clean the workspace (remove `dist/`)

`npm run help` to print the contents of `help.txt` to the command line

**TODO**

`npm run build-prod` ... TODO: compile application to production version

`npm start` .. TODO: start production Server

`npm stop` .. TODO: stop production Server

`npm restart` will restart once start/stop completed


## Notes/Ideas

 - OPTIONS requests?
 - RDBMS vs Document store
  - https://medium.com/statuscode/three-reasons-to-use-a-nosql-document-store-for-your-next-web-application-6b9eabffc8d8
  - Document Store:
    - use for settings data and where schema will be changed often
    - when changes are small crud, based on users interactions?
    - when count and aggregate data is useful to end user
  - RDBMS:
    - less duplicated data, normalized and stored in specific tables
    - useful when data changes often
    - seems like more useful for storing fact data in ETL processes?
    - Q: phoenix?

- CAP theorem stands for C – Consistency, A — Availability, P — Partitioning (or Scalability) and states that having all three properties at the same time is not possible,

### TODO

 - [x] (^) Node 8
 - [x] (^) Webpack  
    - https://medium.com/@christossotiriou/speed-up-nodejs-server-side-development-with-webpack-4-hmr-8b99a932bdda  
    - [x] babel
      - [x] sourcemap support
      - https://www.npmjs.com/package/babel-plugin-source-map-support#description
    - [x] flow webpack plugin - typechecking each compilation
    - [x] eslinting  
    - [x] test with mocha
    - [x] nodemon to run server
 - [x] (^) Fix watch commands so that tests can run and output errors without breaking
    - [x] mocha shouldn't stop the process
    - [x] tests should run again on changes with webpack
 - [x] (^) OpenAPI (Swagger) Documentation and ESDoc Plugin https://swagger.io/docs/specification/about/  
    - [v] OpenAPI Validation  
    - [x] Swagger UI
        - [x] in Docs
 - [x] (^) Debugging while running
     - use `node --inspect dist/server.bundle.js` to start debugger and a node debugging tool to attach
 - [x] (^) Update Linting Rules (linewrap, length, etc)  
    - [x] ensuring files start with a comment https://github.com/Stuk/eslint-plugin-header  
    - [x] Require Comments https://eslint.org/docs/rules/require-jsdoc and valid https://eslint.org/docs/rules/valid-jsdoc  
    - [x] Naming Conventions https://github.com/airbnb/javascript#naming-conventions
    - [x] Test Rules
      - https://www.npmjs.com/package/eslint-plugin-mocha
      - https://github.com/jest-community/eslint-plugin-jest
        - Jest plugin doesn't seem to allow configs of only some rules
    - [x] all variables flow typed?
    - [x] filenames: https://www.npmjs.com/package/eslint-plugin-filenames
    - [x] import/export rules: https://www.npmjs.com/package/eslint-plugin-import
 - [ ] (?) Absolute Paths:
    - maybe: https://itnext.io/configure-absolute-paths-with-create-react-app-and-flow-e4b8922676a2
    - or: https://www.npmjs.com/package/app-module-path
    - [x] fix `__dirname` param in webpack/node with config and solve docs paths
 - [x] (^) Chai as promised and sinon-chai
 - [..] (^) Simple DB endpoint  
    - [ ] MongoDB
      - for quick development? (objects on the fly)
    - [..] PostgreSQL or MariaDB
      - https://mariadb.com/kb/en/library/connector-nodejs-promise-api/
      - [ ] (^) MySQL scripts in repo to init database... update schema later...
    - [ ] (?) ElasticSearch? for search endpoint
    - [..] Proper error messages/codes from endpoints
       - https://www.restapitutorial.com/httpstatuscodes.html
 - [..] (^) Config.yaml (and Env config file?)
    - port
    - database
    - other services/apis later?
    - overrides
 - [ ] (^) Healthcheck
    - Link to in docs
 - [ ] (^) cleanup old builds
 - [ ] (^) Typescript/Express router
    - [ ] Routing Decorators and Validation https://github.com/typestack/routing-controllers
      - Headers
      - Cookies?
    - [ ] OpenApi Decorators for openapi docs generation https://github.com/epiphone/routing-controllers-openapi
      - Newman (Postman) Auto Test Generation: https://github.com/dtzar/openapi-auto-test
    - [ ] Automatically find controller files in entry rather than need to reference  
 - [ ] (-) Request Performance
 - [ ] (-) Helpers
    - [..] mysql
    - [ ] external-service request (with performance monitoring/caching?)
    - [ ] Logging
      - GELF/Kibana?
      - Winston/Bunyon
      - Pino logs to file
    - [ ] SendEmail
    - [ ] Cron?
    - [ ] Authentication?
 - [ ] (-) Request Details Model attached to handler parameters
 - [ ] (-) Compression of responses
 - [ ] (-) Run only affected tests on file save  
 - [ ] (-) Githooks for generating reports/linting  
    - Run `doc` command before commit on develop branch
    - Check if spec files exist (except where special comment in file header)
    - Check if READMEs exist at each directory level?
 - [ ] (-) Automatic Semantic Versioning (Based on PRs?) https://github.com/intuit/auto
 - [ ] (-) production vs dev
      - webpack/build
      - pm2 for production
      - config
      - proper logging
 - [ ] (-) Require Node v8 and recommend v10 on build
 - [ ] (-) `bin/` directory with script named `node.hapi` for starting/stopping prod
 - [..] (v) ESDoc plugins https://medium.com/trabe/understanding-esdoc-plugins-d9ee9095d98b  
 - [ ] (v) Cucumber.js for BDD(Behavior Driven Development) testing http://cucumber.github.io/cucumber-js/  
 - [ ] (v) Test coverage saved in spec files  
 - [ ] (v) Babel Istanbul(NYC) plugin https://github.com/istanbuljs/babel-plugin-istanbul  
 - [ ] (v) Istanbul (NYC) Reporters https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib  
 - [ ] (v) ESDoc Manual with src READMEs https://doc.esdoc.org/github.com/esdoc/esdoc/manual/feature.html#integration-manual  
 - ~~[ ] Docsify?~~  

### Application

 - [..] GET/POST/PUT/DELETE Note endpoints
 - [x] Serve Docs
    - [ ] (v) only in development
 - [ ] External API endpoint
    - Weather (in UI?)
    - (Garbage UPC) Map to information/notes?
 - [ ] Connect to Google Drive/Oauth
 - [ ] Authorized vs Unauthorized endpoints
 - [ ] SSO Server


## Issues

```
events.js:183
      throw er; // Unhandled 'error' event
      ^

Error: spawn mocha ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:190:19)
    at onErrorNT (internal/child_process.js:362:16)
    at _combinedTickCallback (internal/process/next_tick.js:139:11)
    at process._tickCallback (internal/process/next_tick.js:181:9)
```

- Made sure using node v8 and re-ran `npm install -D`


```
module.js:550
    throw err;
    ^

Error: Cannot find module 'babel-polyfill'
```

- Commented out line `polyfill: "@babel/polyfill",` in webpack.config.js
- re-ran webpack `npm run build`
- then uncommented line and ran `npm run start-watch`
