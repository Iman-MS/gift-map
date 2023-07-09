import User from "../models/User.js";

import ErrorResponse from "../utils/errorResponse.js";

import asyncHandler from "../middleware/async.js";

// @desc   gets all users
// @route  GET /api/v1/users/all
// @access Private
export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc   gets a user
// @route  GET /api/v1/users/
// @access Private
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("gifts");

  //if it is correctly formatted id but it is not in the database it will result enter this if block(we dont want to send a response with a true success and data being null in this case)
  if (!user)
    return next(
      new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
    );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc   create a new user
// @route  POST /api/v1/users/
// @access Public
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc   update a user
// @route  PUT /api/v1/users/
// @access Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    // if the new key is set to true we will get back the object after update
    new: true,
    runValidators: true,
  });

  if (!user)
    return next(
      new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
    );

  res.status(200).json({ success: true, data: user });
});

// @desc   delete a user
// @route  DELETE /api/v1/users/
// @access Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user)
    return next(
      new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
    );

  await user.deleteOne();

  res.status(200).json({ success: true, data: user });
});
