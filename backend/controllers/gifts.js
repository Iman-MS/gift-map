import Gift from "../models/Gift.js";

import ErrorResponse from "../utils/errorResponse.js";

import asyncHandler from "../middleware/async.js";

// @desc   gets all gifts
// @route  GET /api/v1/gifts/
// @route  GET /api/v1/:userId/gifts
// @access Private
export const getGifts = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.userId) query = Gift.find({ user: req.params.userId });
  else query = Gift.find();

  const gifts = await query;

  res.status(200).json({ success: true, count: gifts.length, data: gifts });
});
