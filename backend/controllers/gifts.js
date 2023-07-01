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
  else
    query = Gift.find().populate({
      path: "user",
      select: "name",
    });

  const gifts = await query;

  res.status(200).json({ success: true, count: gifts.length, data: gifts });
});

// @desc   creates a gift
// @route  POST /api/v1/gifts/create
// @access Private
export const createGift = asyncHandler(async (req, res, next) => {
  const gift = await Gift.create(req.body);

  res.status(200).json({
    success: true,
    data: gift,
  });
});
