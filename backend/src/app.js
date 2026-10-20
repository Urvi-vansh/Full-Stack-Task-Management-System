import express from 'express';
import cors from 'cors';
import requestLogger from './middleware/requestLogger.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

/**
 * 1. CORS Configuration
 * Enables secure cross-origin requests between the React frontend and Express backend.
 */
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy violation: Origin not allowed'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

/**
 * 2. Body Parsing Middleware
 * Parses incoming JSON and URL-encoded payloads with payload limits to prevent abuse.
 */
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

/**
 * 3. Custom Request Logger Middleware
 * Logs incoming request method, path, response status, and duration in ms.
 */
app.use(requestLogger);

/**
 * 4. API Health Check Route
 * Useful for monitoring and confirming server status.
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TaskFlow REST API is operational',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())} seconds`,
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * 5. Feature Route Handlers
 */
app.use('/api/tasks', taskRoutes);

/**
 * 6. Fallback 404 Route Handler
 * Reached only if no registered route handled the request.
 */
app.use(notFoundHandler);

/**
 * 7. Centralized Error Handling Middleware
 * Catch-all for any errors thrown or forwarded via next(err).
 */
app.use(errorHandler);

export default app;
