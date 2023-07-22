import path from "path";

import Gift from "../models/Gift.js";
import User from "../models/User.js";

import ErrorResponse from "../utils/errorResponse.js";

import asyncHandler from "../middleware/async.js";

// @desc   gets all gifts for the logged in user
// @route  GET /api/v1/gifts/
// @access Private
export const getGifts = asyncHandler(async (req, res, next) => {
  const gifts = await Gift.find({ user: req.user.id });

  res.status(200).json({ success: true, data: gifts });
});

// @desc   gets all gifts
// @route  GET /api/v1/gifts/all
// @route  GET /api/v1/:userId/gifts
// @access Private
export const getAllGifts = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const gifts = await Gift.find({ user: req.params.userId });

    return res
      .status(200)
      .json({ success: true, count: gifts.length, data: gifts });
  } else res.status(200).json(res.advancedResults);
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
// @route  POST /api/v1/gifts/create
// @access Private
export const createGift = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

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
  let gift = await Gift.findById(req.params.giftId);

  if (!gift)
    return next(
      new ErrorResponse(`No gift with the id of ${req.params.giftId}`),
      404
    );

  // Make sure user is the gift owner
  if (gift.user.toString() !== req.user.id)
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this gift`
      ),
      401
    );

  gift = await Gift.findOneAndUpdate({ _id: req.params.giftId }, req.body, {
    new: true,
    runValidators: true,
  });

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

  // Make sure user is the gift owner
  if (gift.user.toString() !== req.user.id)
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this gift`
      ),
      401
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

  // Make sure user is the gift owner
  if (gift.user.toString() !== req.user.id)
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to upload photo for this gift`
      ),
      401
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
