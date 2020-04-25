
**NOTE: Any manual changes to Github Wiki will be overwritten by push (PR merged) to `master` branch**

Welcome to the Manual/Wiki for the Hapi REST Server Template. These files should updated whenever we merge to master, and be in sync between:
 - The README files in the repo,
 - The [Github Wiki](https://github.com/devlinjunker/template.hapi.rest/wiki), and
 - The [generated doc site](https://devlinjunker.github.io/template.hapi.rest/manual/index.html) served when running the server and on github pages


We use a Github Action to accomplish this. The action is executed on merge to the `master` branch and defined inside of the `./.github/workflows/` directory([github](https://github.com/devlinjunker/template.hapi.rest/tree/master/.github/workflows)) (along with all other github actions) that calls a script([github](https://github.com/devlinjunker/template.hapi.rest/tree/master/scripts/actions)) in our `scripts/actions` directory.

The script retrieves the following markdown files (defined in `./.esdoc.json`) and copies them to a temporary directory, then uses the [wiki-page-creator-action](https://github.com/marketplace/actions/wiki-page-creator-action) to update the wiki.

### Table of Contents

- [Setup](manual/README.setup.html) - dependencies and how to install and start development (eventually
production?)
- [Entry Point](manual/README.entry.html) - How we start and setup the server process to handle requests
- [Controllers](manual/README.controllers.html) - mappings from url endpoints to methods for handling requests
- [Dataservices](manual/README.dataservices.html) - classes/methods that connect to external services or datastores
- [Helpers](manual/README.helpers.html) - classes that are used frequently for interacting with other systems/tools
- [Logging](manual/README.logging.html) - Explains how logs works and how to add/view them as a developer
- [Git Hooks](manual/README.scripts.html) - Notes about workflow enforcements
- [Test](manual/README.test.html) - files used to run the unit tests (eventually automated tests)

.
