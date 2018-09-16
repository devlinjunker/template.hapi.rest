import { HelloWorld } from "./hello.js";

import { describe, it } from "mocha";
import { expect } from "chai";

describe("HelloWorld", () => {
  describe("basic()", () => {
    it("returns 'Hello World!'", () => {
      const returned = HelloWorld.basic();

      expect(returned).to.equal("Hello World!");
    });
  });

  describe("name()", () => {
    it("returns 'Hello {request.params.name}!'", () => {
      let request = {
        params: {
          name: "Devlin"
        }
      };

      let returned = HelloWorld.name(request);
      expect(returned).to.equal("Hello Devlin!");

      request.params.name = "Michelle";

      returned = HelloWorld.name(request);
      expect(returned).to.equal("Hello Michelle!");
    });
  });
});
