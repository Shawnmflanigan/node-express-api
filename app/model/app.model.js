const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  message: {
    type: String,
  },
});

module.exports = mongoose.model("App", AppSchema);
