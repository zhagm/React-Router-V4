const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// MODEL SCHEMA
let Item = require("../models/Item");

// ROUTES
router.get("/", (req, res) => {
  Item.find().then((items) => res.send(items));
});

router.post("/", auth, (req, res) => {
  Item.create({ text: req.body.text || "" }, (err, item) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.send(item);
    }
  });
});

router.delete("/:id", auth, (req, res) => {
  Item.findByIdAndDelete(req.params.id, (err, item) => {
    if (err) {
      return next(err);
    } else {
      res.send(item);
    }
  });
});
module.exports = router;
