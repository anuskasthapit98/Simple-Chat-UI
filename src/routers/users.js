const express = require("express");
const Users = require("../controllers/userController");

const router = new express.Router();

router.post("/", Users.add_user);
router.get("/:id", Users.get_user);

module.exports = router;
