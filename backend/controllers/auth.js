import User from "../models/User.js";

import ErrorResponse from "../utils/ErrorResponse.js";

import asyncHandler from "../middleware/async.js";

import sendEmail from "../utils/sendEmail.js";

import crypto from "crypto";

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

// @desc   log user out / clear cookie
// @route  GET /api/v1/auth/logout
// @access Private
export const logout = asyncHandler(async (req, res, next) => {
  console.log("in");
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
});

// @desc   gets the current logged in user
// @route  GET /api/v1/auth/me
// @access Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

// @desc   forgot password
// @route  POST /api/v1/auth/forgotpassword
// @access Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(
      new ErrorResponse(
        `There is no user with the email ${req.body.email}`,
        404
      )
    );

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you or someone else has requested a reset password. Please make a put request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent!" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// @desc   reset password
// @route  PUT /api/v1/auth/resetpassword/:resetToken
// @access Public
export const resetpassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return next(new ErrorResponse("Invalie token", 400));

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

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
    // withCredentials: true,
    // httpOnly: false,
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
