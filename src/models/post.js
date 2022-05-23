const mongoose = require("mongoose");
const User = require("./user");

const postSchema = new mongoose.Schema(
  {
    postedByUser: {
      type: mongoose.Schema.Types.ObjectId,
    },
    content: {
      type: String,
      required: true,
      trim: true,
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

postSchema.statics.getPostByNearest = async function (id) {
  try {
    const user = await User.getUserById(id);

    if (!user) throw { error: "No user with this id found" };
    return this.find({
      location: {
        $near: {
          $geometry: {
            type: user.loc.type,
            coordinates: user.loc.coordinates,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

postSchema.statics.getPostsWithComments = async function () {
  try {
    return this.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userId: "$postedByUser" },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ["$_id", "$$userId"] }] } } },
            { $project: { _id: 0 } },
          ],
          as: "postedBy",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { post_id: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $and: [{ $eq: ["$postId", "$$post_id"] }] } },
            },

            { $project: { _id: 0 } },
            {
              $sort: {
                createdAt: -1,
              },
            },
            { $limit: 3 },
          ],
          as: "comments",
        },
      },
    ]);
  } catch (error) {
    throw error;
  }
};

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
