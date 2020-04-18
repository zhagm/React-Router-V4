let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

// USER MODEL
let User = require("../models/User");

// ROUTES
router
  .route("/")
  .post((req, res, next) => {
    let { name, email, password } = req.body;

    // Create salt & hash then create new user with hashed password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        User.create({ name, email, password: hash }, (error, user) => {
          if (error) {
            return next(error);
          } else {
            jwt.sign(
              { id: user._id },
              jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({ token, user });
              }
            );
            console.log(user);
          }
        });
      });
    });
  })
  .get((req, res) => {
    User.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    User.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("User updated successfully !");
        }
      }
    );
  })
  .delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  });

module.exports = router;
