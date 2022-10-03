export function errorHandler(error, req, res, next) {
  res.status(500).json({
    msg: error.message,
    statusCode: error.statusCode
  });
}