const express = require("express");
const cors = require("cors");

// Load environment variables and database connection
require("dotenv").config();

const app = express();

//CORS config
const allowedOrigins = ['https://agile-sync-react-git-master-abajwa90s-projects.vercel.app']; 
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

//Preflight requests for all routes
app.options('*', cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

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
