const Project = require("../models/project-model");
const Task = require("../models/task-model");

// Controller to create a new project
const createProject = async (req, res) => {
  try {
    const { name, description, creator } = req.body;

    if (!name || !creator) {
      throw new Error("Name and creator are required");
    }

    // Create a new project
    const project = await Project.create({
      name,
      description,
      creator,
    });

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "https://task-manager-client-ebon-eight.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Send the project as response
    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    // Set CORS headers for error responses too
    res.setHeader("Access-Control-Allow-Origin", "https://task-manager-client-ebon-eight.vercel.app");
    res.status(400).json({ message: error.message });
  }
};

// Controller to update a project by id
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, creator } = req.body;

    // Update the project by id
    const project = await Project.findByIdAndUpdate(
      id,
      {
        name,
        description,
        creator,
      },
      { new: true }
    );

    if (!project) {
      throw new Error("Project not found");
    }

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "https://task-manager-client-ebon-eight.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Send the updated project as response
    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    // Set CORS headers for error responses too
    res.setHeader("Access-Control-Allow-Origin", "https://task-manager-client-ebon-eight.vercel.app");
    res.status(400).json({ message: error.message });
  }
};

// Controller to delete a project by id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the project by idx
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      throw new Error("Project not found");
    }

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "https://task-manager-client-ebon-eight.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Send the response
    res.status(204).send();
  } catch (error) {
    // Set CORS headers for error responses too
    res.setHeader("Access-Control-Allow-Origin", "https://task-manager-client-ebon-eight.vercel.app");
    res.status(400).json({ message: error.message });
  }
};

// Export all the functions
module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  getAllTasksByProject,
};
