import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController.js';
import {
  createTaskValidator,
  updateTaskValidator,
  updateStatusValidator,
  taskIdValidator,
  taskQueryValidator,
} from '../validators/taskValidator.js';
import validateTask from '../middleware/validateTask.js';

const router = express.Router();

/**
 * Task Routes Configuration
 * 
 * NOTE ON ROUTING ORDER:
 * Specific subpaths like '/stats' must be declared BEFORE parameterized routes like '/:id'.
 * Otherwise, Express would interpret '/stats' as an :id parameter and trigger ObjectId validation errors.
 */

// Route: GET /api/tasks (fetch all with filters) & POST /api/tasks (create task)
router
  .route('/')
  .get(taskQueryValidator, validateTask, getTasks)
  .post(createTaskValidator, validateTask, createTask);

// Route: GET /api/tasks/stats (dashboard metrics)
router.route('/stats').get(getTaskStats);

// Route: GET, PUT, DELETE for a specific task by MongoDB ObjectId
router
  .route('/:id')
  .get(taskIdValidator, validateTask, getTaskById)
  .put(taskIdValidator, updateTaskValidator, validateTask, updateTask)
  .delete(taskIdValidator, validateTask, deleteTask);

// Route: PATCH /api/tasks/:id/status (update status only)
router
  .route('/:id/status')
  .patch(taskIdValidator, updateStatusValidator, validateTask, updateTaskStatus);

export default router;
