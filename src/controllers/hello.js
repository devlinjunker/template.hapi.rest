//@flow

/**
 * Controllers for Basic "Hello World" Functions
 */
export class HelloWorld {
  /**
   * Returns 'Hello World!'
   * @return {String} Hello World!
   */
  static basic() {
    return "Hello World!";
  }

  /**
   * Returns a customized Hello Message
   * @param  {RequestParams} request Request Parameters
   * @return {String}         Customized Hello Message
   */
  static name(request: any) {

    let name = request.params.name;

    return name + " says: " + Math.random() + "!!!!";
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
