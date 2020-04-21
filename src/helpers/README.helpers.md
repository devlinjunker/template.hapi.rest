# Helpers

Helpers are classes that modularize some functionality that is useful in the server.

## Examples

### MariaDB
Helper class for connecting with mariadb server and saving/retrieving rows from tables
    - query
    - insert
    - fetch
    - fetchOne

### Config
Helper class for reading properties from [config file](https://github.com/devlinjunker/template.hapi.rest/blob/master/conf/config.yaml#L3)
  - provides a typed interface of these properties

### Healthcheck
Helper for building the healthcheck response that is displayed at `<CONFIG.PATHS.healthceck>` endpoint.
  - Determines version/branch and if the server is running properly
  - Makes simple requests to configured dependency DB/External Services to see if they are available



## Notes/Ideas
  - **IDEA:** Should healthcheck read log file for past minute to see if any errors?
  - Do we want/need to worry about Dependency Injection/Singletons?
  - RDBMS vs Document store
    - CAP theorem stands for C – Consistency, A — Availability, P — Partitioning (or Scalability) and states that having all three properties at the same time is not possible,
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
