const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// AUTH CUSTOM MIDDLEWARE - Checks if user is authenticated
function auth(req, res, next) {
  // get token from client
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json("Token missing, user not authorized");
  } else {
    try {
      // Verify token
      let decoded = jwt.verify(token, JWT_SECRET);
      // Store user id in req object;
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json("Token is not valid");
    }
  }
}

module.exports = auth;
