const mongoose = require("mongoose");

// Create a schema for tasks
const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    assignedTo: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a model for tasks
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
