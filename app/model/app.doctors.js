const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  appointments: [
    {
      patientFirst: String,
      patientLast: String,
      time: String,
      date: String,
      kind: String,
    },
  ],
});

module.exports = mongoose.model("Doctor", DoctorSchema);
