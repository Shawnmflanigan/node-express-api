module.exports = (app) => {
  const App = require("../controllers/app.controller");

  app.get("/api/get-all", App.findAll);

  app.post("/api/create", App.create);

  app.get("/api/doctor/:doctorId", App.findOne);

  // app.put("/api/message/:messageId", App.update);

  app.delete("/api/appointment/:appointmentId", App.delete);
};
