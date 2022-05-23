const mongoose = require("mongoose");

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
    loc: {
      type: { type: String },
      coordinates: { type: [Number] },
    },
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
