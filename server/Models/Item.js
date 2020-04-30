const mongoose = require("mongoose");
const { Schema } = mongoose;

let itemSchema = new Schema({
  text: {
    type: String,
  },
});

module.exports = mongoose.model("item", itemSchema);
