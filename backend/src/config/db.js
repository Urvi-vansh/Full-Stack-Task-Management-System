import mongoose from 'mongoose';

/**
 * Connects to MongoDB database using Mongoose.
 * Implements connection event listeners and graceful shutdown.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    // Listen to connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error(`[Database Error] MongoDB runtime error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database Warning] MongoDB disconnected. Attempting reconnection...');
    });

    return conn;
  } catch (error) {
    console.error(`[Database Error] Initial connection failure: ${error.message}`);
    console.error('Make sure local MongoDB is running or update MONGODB_URI in backend/.env with your MongoDB Atlas connection string.');
    // In production we would exit, but for dev we let server run so health checks still respond
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
