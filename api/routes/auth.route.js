import express from "express";
import { signup } from "../controllers/auth.controller.js";

// Initialize express router
const router = express.Router();

// Signup post endpoint
router.post("/signup", signup);

export default router;
