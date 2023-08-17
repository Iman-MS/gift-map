import User from "../models/User.js";

import ErrorResponse from "../utils/ErrorResponse.js";

import asyncHandler from "../middleware/async.js";

// @desc   gets all users
// @route  GET /api/v1/users/all
// @access Private
export const getUsers = asyncHandler(async (req, res, next) => {
  const { name, limit } = req.query;

  try {
    let query = {};

    // If the 'name' parameter is provided, add the name filter to the query
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    let limitValue = parseInt(limit, 10); // Parse 'limit' to an integer

    // Check if 'limit' is a valid positive integer, otherwise set it to 3
    if (isNaN(limitValue) || limitValue <= 0) {
      limitValue = 3;
    }

    // Fetch users based on the query
    const users = await User.find(query).limit(limitValue);

    res.status(200).json({ success: true, data: users });
  } catch (err) {}
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

// @desc   gets a single user based on the userId
// @route  GET /api/v1/users/:userId
// @access Public
export const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

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
