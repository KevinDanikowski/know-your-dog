const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    label: {
      type: Array
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Dog = mongoose.model("dogs", DogSchema);
