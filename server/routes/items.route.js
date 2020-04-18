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
  Item.create({ text: req.body.text || "" }, (error, item) => {
    if (error) {
      return next(error);
    } else {
      res.send(item);
    }
  });
});

module.exports = router;
