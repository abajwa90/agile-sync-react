const Project = require("../models/project-model");
const Task = require("../models/task-model");

//controller to create a new task
const createTask = async (req, res) => {
  try {
    const { projectId, name, description, assignedTo, status } = req.body;

    if (!projectId || !name || !assignedTo) {
      throw new Error("Project id, name, and assignedTo are required");
    }

    const project = await Project.findById(projectId);

    if (!project){
      throw new Error("Project not found");
    }

    // create a new task
    const task = await Task.create({
      projectId,
      name,
      description,
      assignedTo,
      status,
    });

    // send the task as response
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to get all tasks
const getAllTasks = async (req, res) => {
  try {
    // get all tasks
    const tasks = await Task.find().populate("projectId");

    // send the tasks as response
    res.status(200).json({
      message: "All tasks",
      tasks,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to get a task by id
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    // get the task by id
    const task = await Task.findById(id).populate("projectId");

    // send the task as response
    res.status(200).json({
      message: "Task found",
      task,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to update a task by id
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, assignedTo } = req.body;

    // find the task by id and update it
    const task = await Task.findByIdAndUpdate(
      id,
      { name, description, status, assignedTo },
      { new: true }
    );

    // send the updated task as response
    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

//controller to delete a task by id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // find the task by id and delete it
    await Task.findByIdAndDelete(id);

    // send the success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    // if any error occurs send the error message
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
