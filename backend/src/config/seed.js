import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Task from '../models/Task.js';
import connectDB from './db.js';

// Load environment variables
dotenv.config();

const sampleTasks = [
  {
    title: 'Design Responsive Dashboard UI',
    description: 'Create clean, intuitive wireframes and responsive layouts for desktop, tablet, and mobile breakpoints.',
    status: 'Completed',
    priority: 'High',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    title: 'Implement RESTful API Endpoints',
    description: 'Build Express routes, controllers, and middleware for all CRUD operations on Task entity with express-validator.',
    status: 'In Progress',
    priority: 'High',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
  },
  {
    title: 'Configure MongoDB Schema & Indexes',
    description: 'Define Mongoose schema with field validation, length constraints, enums, and compound search indexes.',
    status: 'Completed',
    priority: 'Medium',
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    title: 'Setup React Context & useReducer Store',
    description: 'Implement centralized state management for task list, active filters, loading spinners, and toast alerts.',
    status: 'In Progress',
    priority: 'High',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    title: 'Write Unit & Integration Test Scenarios',
    description: 'Prepare automated test cases for invalid ObjectId validation, required fields, and 404 responses.',
    status: 'Pending',
    priority: 'Medium',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
  },
  {
    title: 'Audit Performance with React.memo & useMemo',
    description: 'Optimize TaskCard and StatisticsCard renders using memoization and stable callback references.',
    status: 'Pending',
    priority: 'Low',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
  },
  {
    title: 'Complete Project Documentation & Examiner Guide',
    description: 'Generate detailed README with full REST API documentation, 13 concepts mapping, and viva questions.',
    status: 'Pending',
    priority: 'High',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
  },
  {
    title: 'Conduct Code Review for Security Best Practices',
    description: 'Sanitize user inputs, prevent NoSQL injection, hide stack traces in production, and set secure CORS headers.',
    status: 'Completed',
    priority: 'Medium',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
];

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Clearing existing tasks...');
    await Task.deleteMany({});

    console.log('[Seed] Inserting sample tasks...');
    const createdTasks = await Task.insertMany(sampleTasks);

    console.log(`[Seed] Success! Inserted ${createdTasks.length} sample tasks.`);
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] Failed to seed database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
