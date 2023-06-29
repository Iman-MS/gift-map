import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message; // for some reason you have to do this manually and it wont get copied in the previous one!

  // Log to console for dev
  console.log(err.stack.red);
  console.log(err);

  // Mongoose bad objectId
  if (err.name === "CastError")
    error = new ErrorResponse(`User not found with id of ${err.value}`, 404);
  // Mongoose duplicate key
  else if (err.code === 11000)
    error = new ErrorResponse("Duplicate field value entered", 400);
  // Mongoose required fields
  else if (err.name === "ValidationError")
    error = new ErrorResponse(
      Object.values(err.errors).map((val) => val.message),
      400
    );

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
