---
version: 0.7.0-SNAPSHOT
---

# Template Webpack REST Server

[![GitHub License](https://img.shields.io/github/license/devlinjunker/template.hapi.rest)](https://github.com/devlinjunker/template.hapi.rest/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdevlinjunker%2Ftemplate.hapi.rest.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdevlinjunker%2Ftemplate.hapi.rest?ref=badge_shield)
[![GitHub last commit](https://img.shields.io/github/last-commit/devlinjunker/template.hapi.rest)](https://github.com/devlinjunker/template.hapi.rest/commits/master)
![Dependency Check by David](https://img.shields.io/david/devlinjunker/template.hapi.rest)
![Dev Dependency Check by David](https://img.shields.io/david/dev/devlinjunker/template.hapi.rest)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/devlinjunker/template.hapi.rest/Doc%20Build%20and%20Wiki%20Sync%20on%20Merge%20to%20%60master%60)](https://github.com/devlinjunker/template.hapi.rest/actions)
[![OpenAPI/Swagger Validator](https://img.shields.io/swagger/valid/3.0?label=openapi&specUrl=https%3A%2F%2Fdevlinjunker.github.io%2Ftemplate.hapi.rest%2Fswagger%2Fopenapi.yaml)](https://devlinjunker.github.io/template.hapi.rest/swagger/)
[![CII Best Practices Summary](https://img.shields.io/cii/summary/4288?label=core-infrastructure)](https://bestpractices.coreinfrastructure.org/en/projects/4288)
[![ESDoc Status](https://raw.githubusercontent.com/devlinjunker/template.hapi.rest/master/docs/badge.svg)](https://devlinjunker.github.io/template.hapi.rest/source.html)


## Intro

Template and Example using Webpack for rapid development of an REST API server with endpoints for managing requests and connections to other servers and/or database/storage tools.

This example can also be used to quickly create a server with your own endpoints to do whatever you would like on any requests (either user/interaction based, or with a cron job to make it on a scheduled basis)

## Dependencies/Frameworks
Node v10+ and npm
  (tested with v10.15.1)

See package.json([github](https://github.com/devlinjunker/template.webpack.fend/blob/master/package.json))
for full list of current dependencies
 - [Hapi v18](https://hapi.dev/) -- Server Library
 - [Webpack](https://webpack.js.org/) + [Loaders ](https://webpack.js.org/concepts/loaders/)-- managing the build process
 - [Babel](https://babeljs.io/) -- compiling newer ECMA2016+ into browser-capable javascript
 - [FlowJS](https://flow.org/) -- adding types to javascript
 - [ESLint](http://eslint.org/) -- enforcing javascript code style
 - [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/) -- unit testing
 - [EsDoc](https://esdoc.org/) -- creating easy javascript documentation
 - [MariaDB](https://mariadb.org/) -- Connecting to mysql/mariadb server for storage
 - [YamlJS](https://openbase.io/js/yamljs) -- Parsing YAML files

## Quick Setup/Run

How to use this template to create a quick HTTP REST server:

1. Download and update node + dependencies
   - After [installing node](https://nodejs.org/en/download/package-manager/) run `npm install -D`
2. Update `conf/config.yaml` with any changes to settings
2. Add endpoint definitions to OpenAPI config in `./openapi.yaml`
3. Add Unit tests in `src/controllers/` (Test Driven Development)
4. Add Controller Files to `src/controllers/`
   - For now, add reference to controller in `src/entry.js` (with other controllers)
   - Controller endpoints will be served at `/api` (or whatever is set in config.yaml)
5. Run `npm run doc` to update the documentation
6. Run `npm run start-watch` to compile and run server + tests in watch mode
   - Navigate to http://localhost:3333/docs/swagger/index.html to see swagger-ui with your new endpoint

### NPM Commands for Testing/Running

`npm run start-watch` to run open the server and run Webpack to watch for changes, recompiling, running the tests and restarting the server when it is done

`npm run test-watch` to run Mocha and with all tests associated with the project, watch for changes on the files to re-run the tests

`npm run dev-watch` to run only webpack to watch for changes on the files and recompile/rerun tests

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


## Links

- [Code of Conduct](https://github.com/devlinjunker/template.hapi.rest/blob/master/CODE_OF_CONDUCT.md)
- [Contribute](https://github.com/devlinjunker/template.hapi.rest/blob/master/CONTRIBUTING.md)
- [Doc Site](https://devlinjunker.github.io/template.hapi.rest/)
- [Wiki](https://github.com/devlinjunker/template.hapi.rest/wiki)
- [Notes/Ideas](https://github.com/devlinjunker/template.hapi.rest/blob/master/NOTES.md)

## Contributors

- [Devlin Junker (Me!)](mailto:devlinjunker@gmail.com)
