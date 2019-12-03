# Setup

Requires Node 8+ (prefer 10?). Please install this before attempting to run. The easiest way to install and
manage node versions is by using the [Node Version Manager](https://github.com/nvm-sh/nvm). After installing
the correct Node version, you should install all project dependencies with `npm install`.

If you have cloned the master branch, then the build should compile and all tests should pass once the
dependencies have been downloaded and installed. To see compilation only you can use `npm run build`, or to
see the tests passing you can use `npm run test`. To watch the files for changes and rebuild/retest the files
on changes, you can use `npm run start-watch`.

The Note Dataservice Endpoints require MariaDB installed as well. After you have installed mariadb, you will
need to set up the initial database using mariadb and a SQL program (or scripts if we get working). Once the
db is set up, the configuration for the database name, user, password and port are in `conf/config.yaml`.

Each endpoint that is created should have an OpenAPI representation in `openapi.yaml`. This file can be used
to run [Swagger UI](https://swagger.io/tools/swagger-ui/) to help with running/testing the processes
developed. (Eventually we will autogenerate OpenAPI file from code annotations and create Postman test suites
based on these descriptions). You can see this at the API link in the docs.

## Webpack

Webpack config file ([source](https://github.com/devlinjunker/template.node.hapi/blob/master/webpack.config.js))
is used to manage our webpack build. In this file we setup..
