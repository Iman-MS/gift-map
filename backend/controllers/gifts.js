import Gift from "../models/Gift.js";
import User from "../models/User.js";

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

// @desc   gets a single gift
// @route  GET /api/v1/gifts/:giftId
// @access Private
export const getGift = asyncHandler(async (req, res, next) => {
  const gift = await Gift.findById(req.params.giftId).populate({
    path: "user",
    select: "name",
  });

  if (!gift)
    next(new ErrorResponse(`No gift with the id of ${req.params.giftId}`, 404));

  res.status(200).json({ success: true, data: gift });
});

// @desc   creates a gift
// @route  POST /api/v1/users/:userId/gifts/create
// @access Private
export const createGift = asyncHandler(async (req, res, next) => {
  req.body.user = req.params.userId;

  const user = await User.findById(req.params.userId);

  if (!user)
    next(new ErrorResponse(`No user with the id of ${req.params.userId}`), 404);

  const gift = await Gift.create(req.body);

  res.status(200).json({
    success: true,
    data: gift,
  });
});
