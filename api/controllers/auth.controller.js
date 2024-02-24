import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  // Get username email and password from request body
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user
  const newUser = new User({ username, email, password: hashedPassword });

  // Try adding user to database
  try {
    // Save user to database
    await newUser.save();
    // Return successful message via response
    res.status(201).json("User created successfully!");
  } catch (error) {
    // Return error message via response
    res.status(500).json(error.message);
  }
};
