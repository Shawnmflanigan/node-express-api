const mongoose = require("mongoose");
const Doctor = require("../model/app.doctors");
const uuId = require("uuid");

require("dotenv").config;

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const doctorSeed = [
  {
    id: uuId,
    firstName: "Sam",
    lastName: "Sammy",
  },
];

Doctor.deleteMany({})
  .remove({})
  .then(() => Doctor.collection.insertMany(doctorSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
