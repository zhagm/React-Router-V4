const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let tempSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("temp", tempSchema);
