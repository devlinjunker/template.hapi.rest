//@flow

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
