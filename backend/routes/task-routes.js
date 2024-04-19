const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task-controller");

//router to create a new task
router.post("/create", taskController.createTask);

//router to get all tasks
router.get("/", taskController.getAllTasks);

//router to get a task by id
router.get("/:id", taskController.getTask);

//router to update a task by id
router.put("/:id", taskController.updateTask);

//router to delete a task by id
router.delete("/:id", taskController.deleteTask);

module.exports = router;
