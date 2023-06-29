import User from "../models/User.js";

// @desc   gets all users
// @route  GET /api/v1/users/
// @access Private
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc   gets a user
// @route  GET /api/v1/users/:userId
// @access Private
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) throw new Error();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};

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
export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc   update a user
// @route  PUT /api/v1/users/:userId
// @access Private
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      // if the new key is set to true we will get back the object after update
      new: true,
      runValidators: true,
    });

    if (!user) throw new Error();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc   delete a user
// @route  DELETE /api/v1/users/:userId
// @access Private
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) throw new Error();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
