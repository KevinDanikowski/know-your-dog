const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
      required: true
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
