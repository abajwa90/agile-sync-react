const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project-controller");

//router to create a new project
router.post("/create", projectController.createProject);

//router to get all projects
router.get("/", projectController.getAllProjects);

//router to get a project by id
router.get("/:id", projectController.getProject);

//router to update a project by id
router.put("/:id", projectController.updateProject);

//router to delete a project by id
router.delete("/:id", projectController.deleteProject);

//router to get all tasks of a project
router.get("/tasks/:projectId", projectController.getAllTasksByProject);

module.exports = router;
