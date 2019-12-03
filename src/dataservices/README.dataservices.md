# Dataservices

Dataservices communicate with storage systems or external APIs to fetch/store data.


## Hello World

Simple example of Hello World endpoint plus example with random value and input from path parameter

## Note Dataservice

Create/Read Note objects out of a mariadb/mysql database


## Notes/Ideas
  - RDBMS vs Document store
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

  - CAP theorem stands for C – Consistency, A — Availability, P — Partitioning (or Scalability) and states that having all three properties at the same time is not possible,
