# Controllers

Controllers are functions that handle requests to specific endpoint paths:

```
function controllerFunction(request) {
    ... do stuff and return a message ...
}
```

The first parameter passed in is the [HapiRequest](https://github.com/hapijs/hapi/blob/master/API.md#request for HapiRequest) object

We define the mapping from endpoint/method to controller function with an JSON object:

```
const map1 = {
  path: "/endpoint",
  method: "GET", ///
  controller: controllerFunction
}
```

To make this endpoint available to the server, we need to export an array of these mappings:

```
export default [ map1, map2, ... ];
```


## Notes/Ideas
 - Do not instantiate classes to handle requests. This would be a huge memory overhead!
    -  From Walmart interview: class methods bad for memory as we don't want to instantiate a class in memory. Seems like that isn't true for static functions though... https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
    - I prefer creating classes with __static__  methods for encapsulation for testing and documentation purposes
 - DO NOT USE SHARED CLASS PROPERTIES/STATEFUL VARIABLES IN CONTROLLER FUNCTIONS
    - These functions need to be stateless.
 - Catch any exceptions that don't have response code and log or email indicating unexpected state
