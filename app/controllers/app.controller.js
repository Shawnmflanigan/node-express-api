const Doctor = require("../model/app.doctors");

// Retrieve all data from the database.
exports.findAll = (req, res) => {
  Doctor.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// Get list of all appointments by doctor by id
// TODO: add endpoint for day --This can also be done on the front end

exports.findOne = (req, res) => {
  Doctor.findById(req.params.doctorId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Doctor not found with id " + req.params.doctorId,
        });
      }
      res.send(data.appointments);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Doctor not found with id " + req.params.doctorId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Doctor with id " + req.params.doctorId,
      });
    });
};

// Delete an existing appointment

exports.delete = (req, res) => {
  Doctor.deleteOne({ apointments: { _id: req.params.appointmentId } })
    .then((data) => {
      console.log(data);
      if (!data) {
        return res.status(404).send({
          message: "Appointment not found with id " + req.params.appointmentId,
        });
      }
      res.send({ message: "appointment deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "appointment not found with id " + req.params.appointmentId,
        });
      }
      return res.status(500).send({
        message:
          "Could not delete appointment with id " + req.params.appointmentId,
      });
    });
};

//add a new appointment by doctor id
//TODO: no more than 3 in same time slot per doctor
//TODO: 15 minute increments

exports.create = (req, res) => {
  Doctor.findByIdAndUpdate(req.params.doctorId, {
    $push: {
      appointments: {
        patientFirst: req.body.patientFirst,
        patientLast: req.body.patientLast,
        time: req.body.time,
        date: req.body.date,
        kind: req.body.kind,
      },
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Doctor not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Doctor not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message:
          "Error creating Appointment with doctorId " + req.params.messageId,
      });
    });
};
