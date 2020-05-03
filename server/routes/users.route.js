const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// USER MODEL
let User = require("../models/User");

// ROUTES
router
  .route("/")
  .post(async (req, res) => {
    // PATH: POST /api/users/ | DESC: create new user if credentials valid and user does not exist | PUBLIC
    // accepts req.body = { name: { type: String, required: true }, email: { type: String, required: true }, password: { type: String, required: true } }
    // returns ({ token: { type: String }, user: { type: Object } })
    let { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json("Please enter all fields");

    let user = await User.findOne({ email });
    if (user) return res.status(400).json("User already exists");

    // Create salt & hash then create new user with hashed password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        User.create({ name, email, password: hash }, (error, user) => {
          if (error) throw error;
          jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) res.status(400).json("Error with JWT key");
              else res.status(201).json({ token, user });
            }
          );
        });
      });
    });
  })
  .get((req, res) => {
    // PATH: GET /api/users/ | DESC: get all users | PRIVATE
    // accepts -
    // returns ([ user: { type: Object } ])
    User.find((err, users) => {
      if (err) res.status(400).json("Error fetching users");
      else res.json(users);
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    // PATH: GET /api/users/:id | DESC: get individual user by id | PRIVATE
    // accepts req.params.id = { type: String, required: true }
    // returns (user: { type: Object })
    User.findById(req.params.id, (err, user) => {
      if (err) res.status(404).json("User does not exist");
      else res.json(user);
    });
  })
  .put((req, res) => {
    // PATH: PUT /api/users/:id | DESC: update user | PRIVATE
    // accepts req.body with any properties that need to be updated in user
    // returns the user object before the udpate (user: { type: Object })
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
      if (err) res.status(400).json("Error updating user");
      else res.json(user);
    });
  })
  .delete((req, res) => {
    // PATH: DELETE /api/users/:id | DESC: delte user | PRIVATE
    // accepts req.params.id = { type: String, required: true }
    // returns (user: { type: Object })
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) res.status(400).json("Error deleting user");
      else res.json(user);
    });
  });

module.exports = router;
