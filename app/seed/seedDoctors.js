const dayjs = require("dayjs");
const mongoose = require("mongoose");
const Doctor = require("../model/app.doctors");

require("dotenv").config();

console.log(process.env.MONGODB_URI);

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
    firstName: "Sam",
    lastName: "Sammy",
    appointments: [
      {
        patientFirst: "Pam",
        patientLast: "Pammy",
        date: "08 / 05 / 2022",
        time: "8:15AM",
        kind: "New Patient",
      },
      {
        patientFirst: "Flim",
        patientLast: "Flammmy",
        date: "08 / 05 /2022",
        time: "8:15AM",
        kind: "New Patient",
      },
    ],
  },
  {
    firstName: "Jam",
    lastName: "Jammy",
    appointments: [
      {
        patientFirst: "Tam",
        patientLast: "Tammy",
        date: 08 / 06 / 2022,
        time: "8:15AM",
        kind: "Follow-Up",
      },
    ],
  },
];

Doctor.deleteMany({})
  .remove({})
  .then(() => Doctor.insertMany(doctorSeed))
  .then((data) => {
    console.log(data);
    console.log(data.result + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
