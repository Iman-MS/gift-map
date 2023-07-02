import User from "../models/User.js";

import ErrorResponse from "../utils/errorResponse.js";

import asyncHandler from "../middleware/async.js";

// @desc   register user
// @route  GET /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
