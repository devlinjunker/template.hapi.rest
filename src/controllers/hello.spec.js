import { HelloWorld } from "./hello.js";

import { describe, it } from "mocha";
import { expect } from "chai";

/** @test {HelloWorld} */
describe("HelloWorld", () => {
  /** @test {HelloWorld.basic} */
  describe("basic()", () => {
    it("returns 'Hello World!'", () => {
      const returned = HelloWorld.basic();

      expect(returned).to.equal("Hello World!");
    });
  });

  /** @test {HelloWorld.name} */
  describe("name()", () => {
    it("returns '{request.params.name} says:'", () => {
      let request = {
        params: {
          name: "Devlin"
        }
      };

      let returned = HelloWorld.name(request);
      expect(returned.startsWith("Devlin says")).to.be.true;

      request.params.name = "Michelle";

      returned = HelloWorld.name(request);
      expect(returned.startsWith("Michelle says")).to.be.true;
    });
  });
});
