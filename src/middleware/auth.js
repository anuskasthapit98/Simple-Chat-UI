const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_KEY = "thisismysecretkey";

const encode = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.getUserById(userId);
    const payload = {
      userId: user._id,
      userName: user.firstName + " " + user.lastName,
      userLocation: user.loc,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
};

const decode = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    req.userName = decoded.userName;
    req.userLocation = decoded.userLocation;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { encode, decode };
