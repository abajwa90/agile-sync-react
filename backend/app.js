const express = require("express");
const cors = require("cors");

// Load environment variables
require("dotenv").config();
require("./config/db").connect();

const app = express();

// Middleware for parsing JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//CORS config
const allowedOrigins = ['*'];  // You may want to limit the origins for better security
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle preflight requests for all routes
app.options('*', cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Routes
const projectRoutes = require("./routes/project-routes");
const taskRoutes = require("./routes/task-routes");
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Debugging
app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);  // Log the request origin for troubleshooting
  next();
});

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
