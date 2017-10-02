import { sum } from "../src/index.js";
import { describe, it } from "mocha";
import chai from "chai";

describe("index.js", function() {
  describe("sum", function() {
    it("adds 2 numbers", function() {
      chai.assert(sum(2, 5) == 7, "test");
    });
  });
});
