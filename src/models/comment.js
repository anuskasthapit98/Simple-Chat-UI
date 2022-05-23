const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commented_by: {
      type: String,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;
