import User from "../models/User.js";

import ErrorResponse from "../utils/errorResponse.js";

import asyncHandler from "../middleware/async.js";

// @desc   register user
// @route  POST /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc   login user
// @route  POST /api/v1/auth/login
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password)
    return next(new ErrorResponse("Please provide an email and password", 400));

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorResponse("Invalid credentials", 401));

  // Check if password mathces
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expire: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRE * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = false;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc   gets the current logged in user
// @route  GET /api/v1/auth/me
// @access Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});