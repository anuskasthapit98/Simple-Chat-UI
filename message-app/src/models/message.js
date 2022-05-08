const mongoose = require("mongoose");
const validator = require("validator");

// defining message models

const Messages = mongoose.model("Messages", {
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
});

module.exports = Messages;
