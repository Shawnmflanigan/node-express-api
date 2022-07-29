module.exports = (app) => {
  const App = require("../controllers/app.controller");

  app.get("/api/get-all", App.findAll);

  app.post("/api/doctor/:doctorId", App.create);

  app.get("/api/doctor/:doctorId", App.findOne);

  app.delete("/api/appointment/:appointmentId", App.delete);
};
