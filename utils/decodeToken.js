const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

async function decodeToken(req, res, next) {
  const { idToken } = req.body;

  try {
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({ idToken });
    const payload = ticket.getPayload();

    req.payload = payload ? { uid: payload.sub, email: payload.email, name: payload.name } : null;

    next();
  } catch (error) {
    next(createError(401));
  }
}

module.exports = decodeToken;
