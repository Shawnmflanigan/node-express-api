const request = require("supertest");
const app = require("../server");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("GET /get-all", function () {
  it("returns an empty array", function (done) {
    request(app)
      .get("/get-all")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });
});
