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
export const createUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `create a new user`,
  });
};

// @desc   update a user
// @route  PUT /api/v1/users/:userId
// @access Private
export const updateUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `update user ${req.params.userId}`,
  });
};

// @desc   delete a user
// @route  DELETE /api/v1/users/:userId
// @access Private
export const deleteUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `delete user ${req.params.userId}`,
  });
};
