const mongoose = require("mongoose");
const User = require("./user");

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

const postSchema = new mongoose.Schema(
  {
    postedByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    loc: locationSchema,
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
            type: "Point",
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
