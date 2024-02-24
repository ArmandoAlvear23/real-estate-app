import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Initialize dotenv
dotenv.config();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error(err);
  });

// Initialize express app
const app = express();

// Get server port from .env file
const serverPort = process.env.SERVER_PORT;

// Run port and listen on server port
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}...`);
});
