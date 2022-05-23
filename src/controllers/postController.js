const Post = require("../models/post");

//creating posts

exports.add_post = async (req, res) => {
  const { content, loc } = req.body;
  const postedByUser = req.userId;
  const post = new Post({
    postedByUser,
    content,
    loc,
  });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send();
  }
};

//listing post with comments

exports.list_posts = async (req, res) => {
  try {
    const posts = await Post.getPostsWithComments();
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

//listing post by nearest location
exports.list_nearPosts = async (req, res) => {
  try {
    const nearestPost = await Post.getPostByNearest(req.userId);
    console.log(nearestPost);
    return res.status(200).json({ success: true, nearestPost });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

//deleting post

exports.delete_post = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
    });
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
};
