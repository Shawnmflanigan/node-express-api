module.exports = (app) => {
  const App = require("../controllers/app.controller");

  app.post("/create", App.create);

  app.get("/get-all", App.findAll);

  app.get("/message/:messageId", App.findOne);

  app.put("/message/:messageId", App.update);

  app.delete("/message/:messageId", App.delete);
};
