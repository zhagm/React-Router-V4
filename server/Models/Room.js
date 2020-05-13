const mongoose = require("mongoose");
const { Schema } = mongoose;

let roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  last_active: {
    type: Date,
    default: Date.now,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
