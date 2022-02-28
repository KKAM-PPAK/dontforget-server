const express = require("express");
const jwt = require("jsonwebtoken");

const decodeToken = require("../utils/decodeToken");
const checkHeader = require("../utils/checkHeader");
const User = require("../models/user");

const router = express.Router();

router.get("/user", checkHeader, async (req, res, next) => {
  const { user, accessToken } = req;

  try {
    const userInfo = await User.findOne({ email: user.email });

    if (!userInfo) {
      return res.send("User Not Found");
    }

    res.send({
      email: userInfo.email,
      name: userInfo.name,
      uid: userInfo.uid,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/signIn", decodeToken, async (req, res, next) => {
  const { email, uid, name } = req.payload;

  try {
    const user = await User.findOne({ email });

    const accessToken = jwt.sign({ email, uid, name }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ email, uid, name }, process.env.JWT_SECRET_KEY, {
      expiresIn: "14d",
    });

    if (!user) {
      await User.create({ email, name, uid, refreshToken });
    }

    res.send({ email, name, uid, accessToken });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
