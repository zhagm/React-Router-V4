const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../utils/authMiddleware");
const JWT_SECRET = process.env.JWT_SECRET;

/* MODELS */
let User = require("../models/User");

/* ROUTES */
router.route("/").post(async (req, res) => {
  // PATH: POST /api/auth/ | DESC: check user credentials and return token and user if valid | PUBLIC
  // accepts req.body = { email: { type: String, required: true }, password: { type: String, required: true } }
  // returns ({ token: { type: String }, user: { type: Object } })
  let { email, password } = req.body;
  if (!email || !password) res.status(400).json("Missing credentials");

  let user = await User.findOne({ email });
  if (!user) res.status(400).json("User does not exist");

  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) res.status(400).json("Invalid credentials");

  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
    if (err) res.status(400).json("Error with JWT key");
    else res.status(201).json({ token, user });
  });
});

router.get("/user", auth, (req, res) => {
  // PATH: GET /api/auth/user | DESC: get authenticated user from token (passed in header) | PRIVATE
  // accepts req.user.id passed in from auth middleware
  // returns (user: { type: Object })
  if (!req.user.id) res.status(400).json("Error with auth middleware");
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error finding authenticated user"));
});

module.exports = router;
