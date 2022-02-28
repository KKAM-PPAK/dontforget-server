const createError = require("http-errors");
const jwt = require("jsonwebtoken");

async function checkHeader(req, res, next) {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    res.send("no accessToken!");
  }
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    req.user = user;
    req.accessToken = accessToken;

    next();
  } catch (error) {
    console.log(error.message);
    if (error.message === "TokenExpiredError") {
      const { email } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {
        ignoreExpiration: true,
      });

      req.refreshUser = email;
      next();
    }

    console.error(error);
    next(createError(error));
  }
}

module.exports = checkHeader;
