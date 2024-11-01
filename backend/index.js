const express = require("express");
const cors = require("cors");

// Load environment variables and database connection
require("dotenv").config();

const app = express();

// CORS configuration for public access (for testing)
app.use(cors({
    origin: '*', // Temporarily allow all origins for testing
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Preflight requests handling
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for testing
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // No content
});

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

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
