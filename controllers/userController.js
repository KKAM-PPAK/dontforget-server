const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.getUser = async function (req, res, next) {
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
};

exports.signIn = async function (req, res, next) {
  const { email, uid, name } = req.payload;

  try {
    const user = await User.findOne({ email });

    const accessToken = jwt.sign({ email, uid, name }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
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
};
