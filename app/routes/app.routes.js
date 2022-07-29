module.exports = (app) => {
  const App = require("../controllers/app.controller");
  const Doctor = require("../controllers/app.controller");

  app.post("/api/create", App.create);

  app.get("/api/get-all", App.findAll);

  app.get("/api/message/:messageId", App.findOne);

  app.put("/api/message/:messageId", App.update);

  app.delete("/api/message/:messageId", App.delete);
};
