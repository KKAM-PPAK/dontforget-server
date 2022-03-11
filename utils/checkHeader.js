const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function checkHeader(req, res, next) {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    req.user = user;
    req.accessToken = accessToken;

    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      const { email } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {
        ignoreExpiration: true,
      });

      const user = await User.findOne({ email });

      if (!user) {
        console.error(error.message);
        return res.status(404).send("you have to sign in first");
      }

      const verifyRefreshToken = jwt.verify(user.refreshToken, process.env.JWT_SECRET_KEY);

      if (!verifyRefreshToken) {
        next(createHttpError(error));
      }

      const { uid, name } = user;
      const newAccessToken = jwt.sign({ email, uid, name }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10m",
      });

      req.user = user;
      req.accessToken = newAccessToken;

      next();
    }
  }
}

module.exports = checkHeader;
