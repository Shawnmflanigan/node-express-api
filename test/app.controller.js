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

  describe("GET /message", () => {
    it("should retrieve a message by id", (done) => {
      let message = {
        message: "Curse of the Gazebo",
      };
      request(app)
        .post("/create")
        .send(message)
        .end((req, res) => {
          request(app)
            .get(`/message/${res._body._id}`)
            .end((err, res) => {
              expect(res._body.message).to.equal("Curse of the Gazebo");
              done();
            });
        });
    });
  });

  describe("DELETE /message", () => {
    it("should delete a message by id", (done) => {
      let message = {
        message: "Space Mountain is the GOAT",
      };
      request(app)
        .post("/create")
        .send(message)
        .end((req, res) => {
          request(app)
            .delete(`/message/${res._body._id}`)
            .end((err, res) => {
              expect(res._body.message).to.equal(
                "Message deleted successfully!"
              );
              done();
            });
        });
    });
  });
});
