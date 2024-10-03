const express = require("express");
const cors = require("cors");

// Load environment variables
require("dotenv").config();
require("./config/db").connect();

const app = express();

// CORS config
const allowedOrigins = ['*'];  // You may want to limit the origins for better security
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // To avoid issues with older browsers (default is 204)
}));

// Handle preflight requests for all routes
app.options('*', cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware for parsing JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes should come after the CORS middleware
const projectRoutes = require("./routes/project-routes");
const taskRoutes = require("./routes/task-routes");

// Routes
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
