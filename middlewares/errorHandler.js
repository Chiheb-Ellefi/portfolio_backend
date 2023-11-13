const { StatusCodes } = require("http-status-codes");

const errorHandler = async (error, req, res, next) => {
  let CustomError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong, try again later",
  };
  if (error.name === "ValidationError") {
    CustomError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    CustomError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }
  return res
    .status(CustomError.statusCode)
    .json({ message: CustomError.message });
};

module.exports = errorHandler;
