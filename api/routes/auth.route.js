import express from "express";
import {
  signup,
  signin,
  google,
  signout,
} from "../controllers/auth.controller.js";

// Initialize express router
const router = express.Router();

// Signup post endpoint
router.post("/signup", signup);

// Signin post endpoint
router.post("/signin", signin);

// Google post endpoint
router.post("/google", google);

// Signout get endpoint
router.get("/signout", signout);

export default router;
