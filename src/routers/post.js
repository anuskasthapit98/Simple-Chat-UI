const express = require("express");
const Post = require("../controllers/postController");
const router = new express.Router();

router.post("/", Post.add_post);
router.get("/", Post.list_posts);
router.get("/near", Post.list_nearPosts);
router.delete("/delete/:id", Post.delete_post);

module.exports = router;
