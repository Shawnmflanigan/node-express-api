const request = require("supertest");
const app = require("../server");
const Message = require("../app/model/app.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
let should = chai.should();

chai.use(chaiHttp);

describe("Messages", () => {
  beforeEach((done) => {
    Message.deleteMany({}, (err) => {
      done();
    });
  });

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

  describe("POST /create", () => {
    it("should create a new message", (done) => {
      let message = {
        message: "Cowtown is the best",
      };
      request(app)
        .post("/create")
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          expect(res.body.message).to.equal("Cowtown is the best");
          done();
        });
    });
  });
});
