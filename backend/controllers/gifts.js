import path from "path";

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
    return next(
      new ErrorResponse(`No gift with the id of ${req.params.giftId}`, 404)
    );

  res.status(200).json({ success: true, data: gift });
});

// @desc   creates a gift
// @route  POST /api/v1/users/:userId/gifts/create
// @access Private
export const createGift = asyncHandler(async (req, res, next) => {
  req.body.user = req.params.userId;

  const user = await User.findById(req.params.userId);

  if (!user)
    return next(
      new ErrorResponse(`No user with the id of ${req.params.userId}`),
      404
    );

  const gift = await Gift.create(req.body);

  res.status(200).json({
    success: true,
    data: gift,
  });
});

// @desc   updates a gift
// @route  PUT /api/v1/gifts/:giftId
// @access Private
export const updateGift = asyncHandler(async (req, res, next) => {
  const gift = await Gift.findByIdAndUpdate(req.params.giftId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!gift)
    return next(
      new ErrorResponse(`No gift with the id of ${req.params.giftId}`),
      404
    );

  res.status(200).json({
    success: true,
    data: gift,
  });
});

// @desc   deletes a gift
// @route  DELETE /api/v1/gifts/:giftId
// @access Private
export const deleteGift = asyncHandler(async (req, res, next) => {
  const gift = await Gift.findById(req.params.giftId);

  if (!gift)
    return next(
      new ErrorResponse(`No gift with the id of ${req.params.giftId}`),
      404
    );

  await gift.deleteOne();

  res.status(200).json({
    success: true,
    data: gift,
  });
});

// @desc   upload photo for a gift
// @route  PUT /api/v1/gifts/:giftId/photo
// @access Private
export const giftPhotoUpload = asyncHandler(async (req, res, next) => {
  const gift = await Gift.findById(req.params.giftId);

  if (!gift)
    return next(
      new ErrorResponse(`No gift with the id of ${req.params.giftId}`),
      404
    );
  if (!req.files) return next(new ErrorResponse(`Please upload a file`), 400);

  const file = req.files.file;

  // Make sure that the image is a photo
  if (!file.mimetype.startsWith("image"))
    return next(new ErrorResponse(`Please upload an image file`), 400);

  // check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD)
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`
      ),
      400
    );

  // create custom file name
  file.name = `photo_${gift.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`), 500);
    }

    await Gift.findByIdAndUpdate(req.params.giftId, { photo: file.name });

    res.status(200).json({ success: true, data: file.name });
  });
});
