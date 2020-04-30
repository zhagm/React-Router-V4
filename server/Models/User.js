const mongoose = require("mongoose");
const { Schema } = mongoose;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  last_online: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
