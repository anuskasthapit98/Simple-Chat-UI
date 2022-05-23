const express = require("express");
const Comments = require("../controllers/commentsController");
const router = new express.Router();

router.post("/:postId", Comments.add_comment);

module.exports = router;
