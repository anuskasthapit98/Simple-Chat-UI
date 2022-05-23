const Comment = require("../models/comment");
const User = require("../models/user");
//creating comments

exports.add_comment = async (req, res) => {
  const { comment } = req.body;
  const { postId } = req.params;
  const user = await User.getUserById(req.userId);
  const commented_by = user.firstName + " " + user.lastName;
  const comments = new Comment({
    commented_by,
    comment,
    postId,
  });

  try {
    await comments.save();
    res.status(201).send(comments);
  } catch (e) {
    res.status(400).send();
  }
};
