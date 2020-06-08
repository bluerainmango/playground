module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //! Dev or Prod
  if (process.env.NODE_ENV === "development") {
    resErrDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
  }
};

function resErrDev(err, req, res) {
  //! API or something else
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  return res.status(err.statusCode).json({
    message: "❓ Something went wrong!",
    error: err,
  });
}
