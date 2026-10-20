/**
 * 404 Not Found Middleware
 * Intercepts any request that does not match any registered route.
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint does not exist`,
    error: 'RouteNotFound',
  });
};

export default notFoundHandler;
