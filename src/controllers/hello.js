//@flow
export class HelloWorld {
  static basic() {
    return "Hello World!";
  }

  static name(request: any) {
    return "Hello " + request.params.name + "!";
  }
}

export default [
  {
    path: "/hello",
    method: "GET",
    controller: HelloWorld.basic
  },
  {
    path: "/{name}",
    method: "GET",
    controller: HelloWorld.name
  }
];
