# Helpers

Helpers are classes that wrap some functionality not associated with an external service

**Examples:**
  - MardiaDB
    - connecting with mariadb server
      - query
      - insert
      - fetch
      - fetchOne
  - Config
    - reading properties from config file
  - Healthcheck
    - Make simple requests to configured DB/External Services to see if available




## Notes/Ideas
  - Do we want/need to worry about Dependency Injection/Singletons?
  - **IDEA:** Move Server into helpers as `server.helper.js`?
