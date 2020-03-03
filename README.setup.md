# Setup

**Requires Node 10+**. Please install this before attempting to run. The easiest way to install and
manage node versions is by using the [Node Version Manager](https://github.com/nvm-sh/nvm). We define a .nvm file
in the project to help reference this minimum node version.

Use `nvm use 10` to switch node versions after installing a new Node version. **Then you should install all
project dependencies**([github](https://github.com/devlinjunker/template.node.hapi/blob/master/package.json#L30)) 
with `npm install` (or `npm install -D` if development work is planned). This should install the Hapi Server Framework,
 MariaDB and other libraries used in this project.

If you have cloned the master branch, then the build should compile and all tests should pass once the
dependencies have been downloaded and installed. To only compile the server, use `npm run build`, or you can
just run the tests with `npm run test`. **To watch the files for changes and rebuild/retest the files
on changes, you can use** `npm run start-watch`. See the package.json([github](https://github.com/devlinjunker/template.node.hapi/blob/master/package.json#L17))
for all possibe npm commands.

The Note Controller/Dataservice Endpoints require MariaDB installed to store the notes passed. After you
have installed mariadb, you will need to set up the initial database using mariadb and a SQL program (or
scripts if we get working). **Once the db is set up, the configuration for the database name, user, password
and port are set in** `conf/config.yaml`
([github](https://github.com/devlinjunker/template.node.hapi/blob/master/conf/config.yaml)).

**Each endpoint that is created should have an OpenAPI representation in** `openapi.yaml`. This file can be
used to run [Swagger UI](https://swagger.io/tools/swagger-ui/) to help with running/testing the processes
developed. There is a Swagger application at the API link in the docs or can view the raw
file([source](../swagger/openapi.yaml)) (Eventually we will autogenerate OpenAPI file from code annotations
and create Postman test suites based on these files)

## Webpack

Webpack config file([github](https://github.com/devlinjunker/template.node.hapi/blob/master/webpack.config.js))
is used to manage our webpack build to compile the application. 

In this file we:
  - designate the files that will be created with the build
  - define the source mapping that will be generated with the output (this should be changed in prod)
  - set the target environment and available globals
  - define where we should look to import files
  - and set up modules/plugins for the build
    - Babel and ESLint Loaders
    - Flow Integration with Webpack
    - Hot Module Replacement for rebuilding on file changes
    - Webpack Shell Plugin to re-run Mocha tests on file changes/rebuild

## Documentation

The `docs/` directory is created with `npm run doc`, this generates an esdoc webpage based on the modified
template stored in `docs/template`.

The Dependency Graph is created with [Madge](https://github.com/pahen/madge) and graphviz, you will need to
install both in order to update the dependency graph. I didn't include these in the package.json dependencies
because I felt this is more than is needed to develop a working app or even write basic documentation.

Install madge with `npm install madge` and install graphviz with `brew install graphviz` or
`port install graphviz` (for OSX)

I split this out to a separate npm script: `npm run doc-image`


## Notes/Ideas
  - **IDEA:**  init scripts with installation and SQL setup
