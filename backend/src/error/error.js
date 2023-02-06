const httpStatus = require("http-status");
const { ValidationError } = require("express-validation");
const APIError = require("../error/apiError");
/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  if (!err) res.json(httpStatus.OK);
  const response = {
    code: err.status || 500,
    message: err.message || httpStatus[err.status],
  };
  res.status(response.code).json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  let convertedError = err;
  if (!convertedError) return;
  if (convertedError instanceof ValidationError) {
    const firstErr = err.details.body[0];
    const firstErrMessage = Object.values(firstErr)[0];
    convertedError = new APIError({
      message: firstErrMessage || "Validation Error",
      errors: convertedError.details,
      status: convertedError.statusCode,
      stack: convertedError.stack,
    });
  } else if (!(convertedError instanceof APIError)) {
    if (convertedError !== undefined) {
      convertedError = new APIError({
        message: convertedError.message,
        status: convertedError.status,
        stack: convertedError.stack,
      });
    }
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: "Not found",
    url: req.url,
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
