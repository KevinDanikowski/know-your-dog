const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    description: {
      type: [String]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Dog = mongoose.model("dogs", DogSchema);
