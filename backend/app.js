// requiring the dotenv package
require("dotenv").config();
// requiring the database connection
require("./config/db").connect();

const express = require("express");
const cors = require("cors");

//CORS config
const allowedOrigins = ['https://agile-sync-react.vercel.app','https://task-manager-server-beryl.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

//Preflight requests for all routes
app.options('*', cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
// requiring the routes
const projectRoutes = require("./routes/project-routes");
const taskRoutes = require("./routes/task-routes");

// getting the port from the environment variables
const PORT = process.env.PORT ||8000;

const app = express();

// set the limit of the request body size
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// using the routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

//test route
app.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;