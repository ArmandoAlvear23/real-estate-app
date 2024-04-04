import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

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

const __dirname = path.resolve();

// Initialize express app
const app = express();

// Allow JSON for server requests
app.use(express.json());

// Add CookieParser
app.use(cookieParser());

// Get server port from .env file
const serverPort = process.env.SERVER_PORT;

// Run port and listen on server port
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}...`);
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Comprehensive error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    request_body: req.body,
  });
});
