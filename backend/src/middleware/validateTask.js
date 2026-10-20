import { validationResult } from 'express-validator';

/**
 * Validation Result Inspector Middleware
 * Gathers validation errors from express-validator.
 * If errors exist, returns HTTP 400 Bad Request with a clear, user-friendly JSON structure.
 * Otherwise, calls next() to continue to the controller.
 */
export const validateTask = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors: formattedErrors,
    });
  }

  next();
};

export default validateTask;
