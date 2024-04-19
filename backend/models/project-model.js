const mongoose = require("mongoose");

// Create a schema for projects
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a model for projects
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
