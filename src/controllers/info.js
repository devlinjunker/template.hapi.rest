//@flow

/**
 * Basic Controller for returning server information
 * @param  {RequestParams} request Request Parameters
 * @return {Object}         Server information Object
 */
function controller(request: any) {
  return request.server.info;
}

export default [
  {
    path: "/info",
    method: "GET",
    controller
  }
];
