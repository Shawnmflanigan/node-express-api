const request = require("supertest");
const app = require("../server");

describe("GET /get-all", () => {
  it("returns an empty array", (done) => {
    request(app)
      .get(`/get-all`)
      .expect((res) => res.body.length.to.be(2))
      .end(done);
  });
});
