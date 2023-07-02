import User from "../models/User.js";

import ErrorResponse from "../utils/errorResponse.js";

import asyncHandler from "../middleware/async.js";

// @desc   gets all users
// @route  GET /api/v1/users/
// @access Private
export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc   gets a user
// @route  GET /api/v1/users/:userId
// @access Private
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate("gifts");

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

// @desc   gets a email and password and if a user with this details was found it will respond the user otherwise responds in error
// @route  POST /api/v1/users/login
// @access Public
export const validateUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `gets a email and password and if a user with this details was found it will respond the user otherwise responds in error`,
  });
};

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
// @route  PUT /api/v1/users/:userId
// @access Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
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
// @route  DELETE /api/v1/users/:userId
// @access Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user)
    return next(
      new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
    );

  await user.deleteOne();

  res.status(200).json({ success: true, data: user });
});
