//@flow
import server from "../server.js";

class HelloWorld {
  static basic() {
    return "Hello World!";
  }

  static name(request) {
    return "Hello " + request.params.name + "!";
  }
}

server.addEndpoint({
  path: "/hello",
  method: "GET",
  controller: HelloWorld.basic
});

server.addEndpoint({
  path: "/{name}",
  method: "GET",
  controller: HelloWorld.name
});
