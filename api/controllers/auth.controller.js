import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
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
    // Return error message via next
    next(error);
  }
};

export const signin = async (req, res, next) => {
  // Get email and password from request body
  const { email, password } = req.body;

  try {
    // Query database for user email
    const validUser = await User.findOne({ email });
    // Check to see if database returned a valid user, otherwise return error
    if (!validUser) return next(errorHandler(404, "User not found!"));
    // Compare request password with database password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // Check if password is a match, otherwise return error
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    // Create JSON web token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Destructure out the password and set everything else to rest
    const { password: pass, ...rest } = validUser._doc;
    // Send result back to client
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
