const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = 8080;

require("./app/routes/app.routes.js")(app);
module.exports = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
