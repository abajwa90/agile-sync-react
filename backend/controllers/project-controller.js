const Project = require("../models/project-model");
const Task = require("../models/task-model");

//controller to create a new project
const createProject = async (req, res) => {
  try {
    const { name, description, creator } = req.body;

    if (!name || !creator) {
      throw new Error("Name and creator are required");
    }

    // create a new project
    const project = await Project.create({
      name,
      description,
      creator,
    });

    // send the project as response
    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to get all projects
const getAllProjects = async (req, res) => {
  try {
    // get all projects
    const projects = await Project.find();

    const projectsWithTasks = await Promise.all(
      projects.map(async (project) => {
        const tasks = await Task.find({ projectId: project._id });
        return {
          ...project._doc,
          tasks,
        };
      })
    );

    // send the projects as response
    res.status(200).json({
      message: "All projects",
      projects: projectsWithTasks,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to get a project by id
const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    // get the project by id
    const project = await Project.findById(id);

    const tasks = await Task.find({ projectId: project._id });

    const projectWithTasks = {
      ...project._doc,
      tasks,
    };

    // send the project as response
    res.status(200).json({
      message: "Project found",
      project: projectWithTasks,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to update a project by id
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, creator } = req.body;

    // update the project by id
    const project = await Project.findByIdAndUpdate(
      id,
      {
        name,
        description,
        creator,
      },
      { new: true }
    );

    // send the updated project as response
    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to delete a project by id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // delete the project by id
    await Project.findByIdAndDelete(id);

    // send the response
    res.status(204).send();
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

const getAllTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    // get all tasks by project id
    const tasks = await Task.find.find({ projectId }).populate("projectId");

    // send the tasks as response
    res.status(200).json({
      message: "All tasks by project",
      tasks,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

// export all the functions
module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  getAllTasksByProject,
};
