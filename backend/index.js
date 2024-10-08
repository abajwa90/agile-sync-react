const express = require("express");
//const cors = require("cors");

// Load environment variables
require("dotenv").config();
require("./config/db").connect();

const app = express();

// Middleware for parsing JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
const projectRoutes = require("./routes/project-routes");
const taskRoutes = require("./routes/task-routes");
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
