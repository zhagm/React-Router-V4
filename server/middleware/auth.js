const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

// AUTH CUSTOM MIDDLEWARE - Checks if user is authenticated
function auth(req, res, next) {
  // get token from client
  const token = req.header("x-auth-token");

  if (!token) res.status(401).send("Token missing, user not authorized");

  try {
    // Verify token
    let decoded = jwt.verify(token, jwtSecret);
    // Store user id in req object;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Token is not valid");
  }
}

module.exports = auth;
