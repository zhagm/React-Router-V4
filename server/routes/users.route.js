let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// USER MODEL
let userSchema = require("../models/User");

// ROUTES
router
  .route("/")
  .post((req, res, next) => {
    userSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  })
  .get((req, res) => {
    userSchema.find((error, data) => {
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
    userSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    userSchema.findByIdAndUpdate(
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
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
