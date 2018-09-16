//@flow
import server from "../server.js";

server.addEndpoint({
  path: "/info",
  method: "GET",
  controller: () => {
    return server.getInfo();
  }
});
