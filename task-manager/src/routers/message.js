const express = require("express");
const Message = require("../models/message");
const auth = require("../middleware/auth");
const router = new express.Router();

//mcreate message

router.post("/message", auth, async (req, res) => {
  const message = new Message({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await message.save();
    res.status(201).send(message);
  } catch (e) {
    res.status(400).send();
  }
});

//fetch all messages
router.get("/messages", auth, async (req, res) => {
  try {
    const messages = await Message.find({ owner: req.user._id });
    res.send(messages);
  } catch (e) {
    res.status(500).send();
  }
});

//fetch messages by ID

router.get("/messages/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const message = await Message.findOne({ _id, owner: req.user._id });
    if (!message) {
      return res.status(404).send();
    }
    res.send(message);
  } catch (e) {
    res.status(500).send();
  }
});

//updating message

router.patch("/messages/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const _id = req.params.id;
  try {
    const message = await Message.findOne({
      _id: req.params.is,
      owner: req.user._id,
    });

    if (!message) {
      return res.status(404).send();
    }
    updates.forEach((update) => (message[update] = req.body[update]));

    await message.save();

    res.send(message);
  } catch (e) {
    res.status(400).send(e);
  }
});

//deleting messages

router.delete("/messages/:id", auth, async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!message) {
      return res.status(404).send();
    }
    res.send(message);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
