 - [ ] Review and Update [Security Policy](SECURITY.md)
    - Provide private way of reporting vulnerabilities?

## TODO
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
 - [x] (^) Chai as promised and sinon-chai
 - [..] (^) Simple DB endpoint
    - [..] PostgreSQL or MariaDB
      - https://mariadb.com/kb/en/library/connector-nodejs-promise-api/
      - [ ] SQL scripts in repo to init database... update schema later...
      = [ ] (^) Sequelize? https://sequelize.org/v5/
 - [..] (^) Config.yaml (and Env config file?)
    - port
    - database
    - other services/apis later?
    - [ ] overrides
 - [x] (^) Healthcheck
    - Server status
    - MariaDB
    - External Service
    - [x] Link to in docs
    - [x] Version?
 - [x] (^) cleanup old builds
 - [x] (-) Madge for Dependency graph
 - [x] (-) Githooks for generating reports/linting
    - [x] Run tests and cancel on tests fail
    - [ ] Different actions on different branch names?
 - [..] Github actions
    - [x] Run build and test
    - [ ] Run `doc` command before commit on develop branch
        - [ ] after merge
    - [ ] Check if READMEs exist at each directory level?
    - [ ] Check if spec files exist (except where special comment in file header)
 - [..] (^) Improve logging
    - [x] configuration
    - ~rotate~
    - [x] pino-pretty
    - [ ] slack message on error?
 - [ ] (^) Hapi Improvements
    - [ ] (-) Use Hapi Error (in production? not dev?) https://www.npmjs.com/package/hapi-error
    - Dev Errors in log https://www.npmjs.com/package/hapi-dev-errors
    - Hapi Swagger https://github.com/glennjones/hapi-swagger
    - Joi object/param validation https://hapi.dev/family/joi/
    - Simple Authentication for Healthcheck/Logging https://hapi.dev/tutorials/auth/
    - Advanced Authentication
 - [ ] (^) GoAccess log analyzer
    - https://goaccess.io/
 - [ ] (-) Websocket Logging Endpoint
    - display logs and any new logs at endpoint
 - [ ] (v) Test coverage saved in spec files
 - [ ] (v) Babel Istanbul(NYC) plugin https://github.com/istanbuljs/babel-plugin-istanbul
 - [ ] (v) Istanbul (NYC) Reporters https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib
   - Read test results report on webpage in docs site
 - [ ] (-) Uptime Robot to check if app/website/api is alive or not
 - [ ] (-) Request Performance
 - [ ] (-) Helpers
    - [..] mysql
    - [ ] external-service request (with performance monitoring/caching?)
    - [..] healthcheck using db and external service configs
    - [ ] (^) Authentication
    - [ ] (^) Logging
      - GELF/Kibana?
      - Winston/Bunyon
    - [ ] SendEmail (mailchimp?)
    - [ ] Cron?
    - [ ] ElasticSearch? for search endpoint
 - [ ] (-) Request Details Model attached to handler parameters
 - [ ] (-) Compression of responses
 - [ ] (-) Run only affected tests on file save
 - [ ] (-) Typescript/(Express?) router
    - [ ] Routing Decorators and Validation https://github.com/typestack/routing-controllers
      - Headers
      - Cookies?
    - [ ] OpenApi Decorators for openapi docs generation https://github.com/epiphone/routing-controllers-openapi
      - Newman (Postman) Auto Test Generation: https://github.com/dtzar/openapi-auto-test
    - [ ] Automatically find controller files in entry rather than need to reference
    - [ ] Proper error messages/codes from endpoints
       - https://www.restapitutorial.com/httpstatuscodes.html
    - [ ] MongoDB
      - for quick development? (objects on the fly)
 - [ ] (-) production vs dev
      - webpack/build
      - pm2 for production
      - config
      - log rotation
 - [ ] (-) Require Node v8 and recommend v10 on build
 - [ ] (-) `bin/` directory with script named `node.hapi` for starting/stopping prod
    - could be a javascript script file...
 - [ ] (-) Onboarding Documentation
    - Environment Setup (IDEs, Building, Deployment, Repos)
    - Overview of Architecture
    - Resources for Languages/Frameworks/Libraries
    - Coding Standards
    - Technical Process (reviews, issue management, story lifecycle)
    - Domain Specific Language (Jargon)
    - Roles and Responsibilities
 - [ ] (?) Absolute Paths:
    - maybe: https://itnext.io/configure-absolute-paths-with-create-react-app-and-flow-e4b8922676a2
    - or: https://www.npmjs.com/package/app-module-path
    - [x] fix `__dirname` param in webpack/node with config and solve docs paths
 - [..] (v) ESDoc plugins https://medium.com/trabe/understanding-esdoc-plugins-d9ee9095d98b
 - [ ] (v) Cucumber.js for BDD(Behavior Driven Development) testing http://cucumber.github.io/cucumber-js/
 - [x] (v) ESDoc Manual with src READMEs https://doc.esdoc.org/github.com/esdoc/esdoc/manual/feature.html#integration-manual
 - ~~[ ] Docsify?~~

### Application

 - [..] GET/POST/PUT/DELETE Note endpoints
 - [x] Serve Docs
    - [x] (v) ~only in development~ with config setting
 - [ ] Websocket
    - Log output to website & file instead of console
      - config.yaml settings
 - [ ] External API endpoint
    - Weather (in UI?)
    - (Garbage UPC) Map to information/notes?
 - [ ] Connect to Google Drive/Oauth
 - [ ] Authorized vs Unauthorized endpoints
 - [ ] SSO Server


## Issues

**Issues seeing endpiont**
Error in Log:
```
Debug: handler, error
    Error: Not Found
    at internals.notFound
```

Occurs when you are using browser to hit endpoint that has not been registered with Server. Check:
 - Spelling in browser url bar or controller file
 - Recompiled after adding new endpoint

**Issues when properties missing/misnamed in controller route objects**
TODO: add issues

**Issues when controllers/routes being duplicated**
TODO: add issues

**Issues with wrong node version (<8)**
TODO: add issues

**Issues when not using babel/polyfill**
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
