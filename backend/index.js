const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load environment variables and database connection
require("dotenv").config();

const app = express();

// CORS configuration
app.use(cors({
  origin: true,              
  methods: ['GET', 'POST', 'PUT', 'DELETE'],   
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with', 'Origin', 'Accept'],
  credentials: true                            
}));

app.options('*', cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
const projectRoutes = require("./routes/project-routes");
const taskRoutes = require("./routes/task-routes");

app.use("/api/projects", projectRoutes);
app.use(taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
