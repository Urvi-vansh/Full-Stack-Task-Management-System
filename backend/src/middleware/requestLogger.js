/**
 * Custom Request Logger Middleware
 * Logs HTTP Method, Request URL, Response Status Code, and Execution Duration in milliseconds.
 * Explains middleware execution in Express:
 * - Runs before the route handler
 * - Hooks into 'res.on("finish")' to capture the final status and time taken
 * - Calls next() to pass control to the next middleware in the pipeline
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    
    // Choose terminal color based on status code
    let statusColor = '\x1b[32m'; // Green (2xx)
    if (statusCode >= 500) statusColor = '\x1b[31m'; // Red (5xx)
    else if (statusCode >= 400) statusColor = '\x1b[33m'; // Yellow (4xx)
    else if (statusCode >= 300) statusColor = '\x1b[36m'; // Cyan (3xx)
    const resetColor = '\x1b[0m';

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} -> ${statusColor}${statusCode}${resetColor} (${duration}ms)`
    );
  });

  next();
};

export default requestLogger;
