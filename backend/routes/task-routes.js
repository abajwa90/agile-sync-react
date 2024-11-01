const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task-controller");

// Route to create a new task
router.post("/api/tasks/create", taskController.createTask);

// Route to get all tasks
router.get("/api/tasks", taskController.getAllTasks);

// Route to get a task by id
router.get("/api/tasks/:id", taskController.getTask);

// Route to update a task by id
router.put("/api/tasks/:id", taskController.updateTask);

// Route to delete a task by id
router.delete("/api/tasks/:id", taskController.deleteTask);

module.exports = router;