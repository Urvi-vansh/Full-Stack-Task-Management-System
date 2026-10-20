/**
 * Async Handler Middleware Wrapper
 * Eliminates repetitive try-catch blocks in Express controllers.
 * Catches any thrown exceptions or rejected promises and forwards them to next(err).
 * 
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware function
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
