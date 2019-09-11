//@flow

/**
 * NOTE: from Walmart interview: instantiating classes would be bad, these static functions are
 *    alright, but really could be pure functions as no state is needed
 *
 * Controllers for Hello World
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
