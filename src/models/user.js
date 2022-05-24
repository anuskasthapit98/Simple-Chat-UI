const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
  _id: false,
  timestamps: false,
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    loc: locationSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
