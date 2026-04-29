export function notFoundHandler(_req, res) {
  return res.status(404).json({
    error: "That endpoint does not exist.",
  });
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.status || error.code || 500;
  const isUpstreamError = statusCode >= 400 && statusCode < 600;

  if (isUpstreamError && error.message) {
    return res.status(statusCode).json({
      error: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "The chatbot is having trouble right now. Please try again in a moment.",
  });
}

