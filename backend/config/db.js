const mongoose = require("mongoose");

// Get the MONGO_URI from the environment variables
const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      // If connection is successful then log a message
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      // If connection fails then log a message and exit the process
      console.log("Database connection failed.");
      console.error(error);
      process.exit(1);
    });
};
