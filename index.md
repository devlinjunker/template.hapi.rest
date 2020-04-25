# Template REST API Docs

Welcome to the Manual/Wiki for the Hapi REST Server Template. These files should updated whenever we merge to master, and be in sync between the README files in the repo, the Github Wiki and the generated docs pages served when running the server. We use a Github Action to accomplish this.

We define an action to execute on merge to the `master` branch inside of the `./.github/workflows/` [directory](https://github.com/devlinjunker/template.node.hapi/tree/master/.github/workflows) (along with all other github actions) that calls a [script](https://github.com/devlinjunker/template.node.hapi/tree/master/scripts/actions) in our `scripts/actions` directory. The script retrieves the following markdown files (defined in `./.esdoc.json`) and copies them to a temporary directory, then uses the [wiki-page-creator-action](https://github.com/marketplace/actions/wiki-page-creator-action) to update the wiki.

### Table of Contents

- [Setup](manual/README.setup.html) - dependencies and how to install and start development (eventually
production?)
- [Entry Point](manual/README.entry.html) - How we start and setup the server process to handle requests
- [Controllers](manual/README.controllers.html) - mappings from url endpoints to methods for handling requests
- [Dataservices](manual/README.dataservices.html) - classes/methods that connect to external services or datastores
- [Helpers](manual/README.helpers.html) - classes that are used frequently for interacting with other systems/tools
- [Logging](manual/README.logging.html) - Explains how logs works and how to add/view them as a developer
- [Git Hooks](manual/README.hooks.html) - Notes about workflow enforcements
- [Test](manual/README.test.html) - files used to run the unit tests (eventually automated tests)

.
