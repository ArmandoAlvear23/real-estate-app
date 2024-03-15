import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "API user test route is working",
  });
};

export const updateUser = async (req, res, next) => {
  // If ID param does not match JWT user ID return forbiden error
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "Forbidden"));

  try {
    // If request contains password
    if (req.body.password) {
      // Hash password
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // Find user by ID and update specified fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // Only update these fields if present in body
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    // Remove password from object to send back as response
    const { password, ...rest } = updatedUser._doc;
    // Send back response
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
