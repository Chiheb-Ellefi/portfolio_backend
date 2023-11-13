const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "Provide a status"],
    },
    links: {
      type: [Object],
      required: [true, "Provide a list of links"],
    },
    image: {
      type: String,
      required: [true, "Provide a photo"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Home", HomeSchema);
