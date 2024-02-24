import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

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

// Allow JSON for server requests
app.use(express.json());

// Get server port from .env file
const serverPort = process.env.SERVER_PORT;

// Run port and listen on server port
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}...`);
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/auth/", authRouter);
