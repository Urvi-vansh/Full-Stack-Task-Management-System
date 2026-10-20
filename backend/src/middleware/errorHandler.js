/**
 * Centralized Error Handling Middleware
 * Intercepts all errors thrown across the application.
 * Differentiates between Mongoose validation errors, casting errors, duplicate key errors, and unexpected crashes.
 * Never leaks sensitive stack traces to clients in production.
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode || 500);
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // 1. Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = `Invalid ID format for parameter: '${err.value}'. Must be a valid 24-character hexadecimal ObjectId.`;
  }

  // 2. Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Database schema validation failed.';
    errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
  }

  // 3. Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. Please use another value.`;
  }

  // 4. Bad JSON payload in request body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Malformed JSON payload in request body.';
  }

  // Log error in server console
  console.error(`[Error Handler] [${req.method} ${req.originalUrl}]:`, err.message || err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
