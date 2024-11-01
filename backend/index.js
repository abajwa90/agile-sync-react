const express = require("express");
const cors = require("cors");

// Load environment variables and database connection
require("dotenv").config();

const app = express();

// CORS configuration
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with', 'Origin', 'Accept'],
  credentials: true
}));

// Custom middleware to set Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://agile-sync-react.vercel.app/"); // Replace with your desired origin
  next();
});

app.options('*', cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
