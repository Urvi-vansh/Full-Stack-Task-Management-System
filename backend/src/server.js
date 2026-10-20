import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

/**
 * Start the HTTP Server after initializing Database connection
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 TaskFlow Backend Server running on port ${PORT}`);
      console.log(`🌐 Base URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📋 Tasks API: http://localhost:${PORT}/api/tasks`);
      console.log(`📊 Stats API: http://localhost:${PORT}/api/tasks/stats`);
      console.log(`====================================================`);
    });

    // Handle Unhandled Promise Rejections gracefully
    process.on('unhandledRejection', (err) => {
      console.error(`[Process Error] Unhandled Rejection: ${err.message}`);
      // Close server and exit process
      server.close(() => process.exit(1));
    });

    // Handle Uncaught Exceptions
    process.on('uncaughtException', (err) => {
      console.error(`[Process Error] Uncaught Exception: ${err.message}`);
      server.close(() => process.exit(1));
    });

    // Handle Graceful Termination (SIGTERM, SIGINT)
    const gracefulShutdown = () => {
      console.log('\n[Process] Received termination signal. Closing HTTP server and DB connection...');
      server.close(async () => {
        try {
          const mongoose = (await import('mongoose')).default;
          await mongoose.connection.close();
          console.log('[Process] MongoDB connection closed.');
          process.exit(0);
        } catch (e) {
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    console.error(`[Server Error] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
