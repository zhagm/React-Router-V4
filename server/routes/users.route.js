const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  process.env.JWT_SECRET || require("../config/keys").JWT_SECRET;

// USER MODEL
let User = require("../models/User");

// ROUTES
router
  .route("/")
  .post(async (req, res, next) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please enter all fields" });

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

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
              if (err) throw err;
              res.json({ token, user });
            }
          );
        });
      });
    });
  })
  .get((req, res) => {
    User.find((error, data) => {
      if (error) return next(error);
      else res.json(data);
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    User.findById(req.params.id, (error, data) => {
      if (error) return next(error);
      else res.json(data);
    });
  })
  .put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
      if (err) return next(err);
      else res.json(user);
    });
  })
  .delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) return next(err);
      else res.status(200).json(data);
    });
  });

module.exports = router;
