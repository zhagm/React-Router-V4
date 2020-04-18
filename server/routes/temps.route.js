const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// MODEL SCHEMA
let tempSchema = require("../models/Temp");

// ROUTES
router.route("/").get((req, res) => {
  res.status(200).send("WORKING");
});

module.exports = router;
