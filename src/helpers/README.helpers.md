# Helpers

Helpers are classes that wrap some functionality not associated with an external service

**Examples:**
  - [..] mysql/mardiadb
    - connecting with mariadb server
      - query
      - insert
      - fetch
      - fetchOne
  - [..] config
    - reading properties from config file
  - [ ] external-service request (with performance monitoring/caching?)
  - [ ] Logging
    - GELF/Kibana?
    - Winston/Bunyon
  - [ ] SendEmail
  - [ ] Cron?
  - [ ] Authentication?


## Notes/Ideas
  - Do we want/need to worry about Dependency Injection/Singletons?
  - IDEA: Move Server into helpers as `server.helper.js`?
