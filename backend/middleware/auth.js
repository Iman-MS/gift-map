import jwt from "jsonwebtoken";

import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";

//Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.cookies.token);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }
  // Set token from cookie
  if (req.cookies.token) token = req.cookies.token;
  console.log(req.cookies);

  // Make sure token exists
  if (!token)
    return next(new ErrorResponse("Not authorized to access this route", 401));

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findById(decoded.id);

    //setting the response headers in the protect, so that we dont have to set it in every route that uses protect
    res
      .set("Access-Control-Allow-Credentials", "true")
      .set("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
