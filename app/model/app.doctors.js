const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
  doctor: {
    firstName: String,
    lastName: String,
    appointments: {
      patientFirst: String,
      patientLast: String,
      dateTime: Date,
      kind: String,
    },
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
