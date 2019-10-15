# Codebase

## Best Practices
 - Do not use relative imports, we set up `app` prefix on imports to redirect to the `src` directory so we can create absolute paths from there  
    e.g. `app/controllers/hello.controller.js` transforms to `<PROJECT_ROOT>/src/controllers/hello.controller.js` 

## Directories

`base/` contains classes/files used to run the server and help handle requests

`controllers/` contains the mappings from endpoints to methods for handling requests

`dataservices/` contain the classes/methods that connect to external services or datastores
