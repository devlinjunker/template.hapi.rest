# Dataservices

Dataservices abstract the communication with storage systems or external APIs to fetch/store data related to a
topic or for a specific UI component.

## Examples

### Note Dataservice
Create/Read Note objects out of a mariadb/mysql database


## Notes/Ideas
- Quick storage dataservice (abstracted away from specific object?)
  - takes object from post/put request and places in mongodb
  - objects indexed by another param
  - automatically assigned id
  - retrieves with get request
  - delete request
    - takes multiple object ids
  - search/or retrieve by property?
