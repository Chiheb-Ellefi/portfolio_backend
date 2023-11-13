const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide a project name"],
    },
    description: {
      type: String,
      required: [true, "Provide a project description "],
    },
    tools: {
      type: Object,
      required: [true, "Provide the tools"],
    },
    demoLink: {
      type: String,
      match: [/^(ftp|http|https):\/\/[^ "]+$/, "Provide a valid URL"],
    },
    githubLink: {
      type: String,
      match: [/^(ftp|http|https):\/\/[^ "]+$/, "Provide a valid URL"],
    },
    techImage: {
      type: String,
      required: [true, "Provide an image for the technology used"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
