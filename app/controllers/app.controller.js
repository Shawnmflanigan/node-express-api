const App = require("../model/app.model.js");
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

// Get list of all appointments by doctor by day

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
//TODO change this so we're not deleting patients.
exports.delete = (req, res) => {
  App.remove({ _id: req.params.appointmentId })
    .then((data) => {
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

//add a new appointment
//no more than 3 in same time
//15 minute increments

// Create and Save a new Message
exports.create = (req, res) => {
  const message = new App({
    message: req.body.message,
  });

  message
    .save()
    .then((data) => {
      res.send(data);
      console.log("Message Created", data.message);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
  App.findByIdAndUpdate(
    req.params.messageId,
    {
      message: req.body.message,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.messageId,
      });
    });
};

// Delete a message with the specified messageId in the request
// exports.delete = (req, res) => {
//   App.findByIdAndRemove(req.params.messageId)
//     .then((data) => {
//       if (!data) {
//         return res.status(404).send({
//           message: "Message not found with id " + req.params.messageId,
//         });
//       }
//       res.send({ message: "Message deleted successfully!" });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId" || err.name === "NotFound") {
//         return res.status(404).send({
//           message: "Message not found with id " + req.params.messageId,
//         });
//       }
//       return res.status(500).send({
//         message: "Could not delete message with id " + req.params.messageId,
//       });
//     });
// };
