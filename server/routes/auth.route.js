const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../utils/authMiddleware");
const JWT_SECRET =
  process.env.JWT_SECRET || require("../config/keys").JWT_SECRET;

// USER MODEL
let User = require("../models/User");

/* ROUTES */

/* PATH: POST /api/auth/ | DESC: check user credentials and return token if valid | PUBLIC */
router.route("/").post(async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) res.status(400).send("Missing credentials");

  // Check if user exists
  let user = await User.findOne({ email });
  if (!user) res.status(400).send("User does not exist");

  // Validate Password and send back token if valid
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) res.status(400).send("Invalid credentials");

  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
    // if (err) throw err;
    if (err) {
      res
        .status(400)
        .send(
          "Error with JWT key, you might not have a config/keys.js file, check server/config/your-keys.js"
        );
    }
    req.io.emit("UserAuthenticated", user._id);
    res.send({ token, user });
  });
});

/* PATH: GET /api/auth/user | DESC: get user from token (passed in header) | PRIVATE */
router.get("/user", auth, (req, res, next) => {
  User.findById(req.user.id)
    .select("-password") // Send user excluding password
    .then((user) => {
      console.log("USER AUTHENTICATED");
      req.io.emit("UserAuthenticated", req.user.id);
      res.send(user);
    });
});

module.exports = router;
