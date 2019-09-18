# Controllers

Controllers are functions that handle requests to specific endpoint paths.

```
function controllerFunction(request) {
    ... do stuff and return a message ...
}
```

We define the mapping from endpoint/method to controller function with an JSON object.

```
const map1 = {
  path: "/endpoint",
  method: "GET", ///
  controller: controllerFunction
}
```

To make this endpoint available to the server, we need to export an array of these mappings.

```
export default [ map1, map2, ... ];
```


## Notes:
 - Do not instantiate classes to handle requests. This would be a huge memory overhead!
   - I prefer creating classes with __static__  methods for encapsulation and documentation purposes
   - __DO NOT USE SHARED CLASS PROPERTIES/STATEFUL VARIABLES IN CONTROLLER FUNCTIONS__.
   - These functions need to be stateless.
