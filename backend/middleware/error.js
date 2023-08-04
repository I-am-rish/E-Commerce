const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongoDB invalid id error
  if (err.name === "CastError") {
    const message = `Resource not found invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error / already registered user
  if (err.code === 11000) {
    const message = `User already registered with ${req.body.email}`;
    err = new ErrorHandler(message, 400);
  }

  //jwt token expired error
  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    err = new ErrorHandler(message, 400);
  }

  //invalid jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid Token";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
