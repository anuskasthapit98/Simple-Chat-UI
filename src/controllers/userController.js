const Users = require("../models/user");

//creating users

exports.add_user = async (req, res) => {
  const { firstName, lastName, loc } = req.body;

  const user = new Users({
    firstName,
    lastName,
    loc,
  });

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send();
  }
};

exports.get_user = async (req, res) => {
  try {
    const user = await Users.getUserById(req.params.id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
