import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Get access token from cookies
  const token = req.cookies.access_token;
  // If token is null
  if (!token) return next(errorHandler(401, "Unauthorized"));
  // Verify JSON Web Token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Return error if unverified JWT
    if (err) return next(errorHandler(403, "Forbiden"));
    // Set verified user to user request
    req.user = user;
    // Proceed to next process
    next();
  });
};
