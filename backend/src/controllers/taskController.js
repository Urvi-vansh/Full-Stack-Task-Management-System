import Task from '../models/Task.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @desc    Fetch all tasks with optional search, filtering, and sorting
 * @route   GET /api/tasks
 * @access  Public
 */
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search, sortBy = 'createdAt', order = 'desc' } = req.query;

  // Build dynamic MongoDB query filter
  const query = {};

  // Status filtering (ignore if 'All' or empty)
  if (status && status !== 'All') {
    query.status = status;
  }

  // Priority filtering (ignore if 'All' or empty)
  if (priority && priority !== 'All') {
    query.priority = priority;
  }

  // Search by title or description using case-insensitive regex
  if (search && search.trim() !== '') {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  // Sorting
  const sortDirection = order.toLowerCase() === 'asc' ? 1 : -1;
  const sortOptions = {};
  
  if (sortBy === 'priority') {
    // Priority custom sort weighting could be done, or standard field sorting
    sortOptions.priority = sortDirection;
  } else if (sortBy === 'dueDate') {
    // Tasks without due date placed at the end
    sortOptions.dueDate = sortDirection;
  } else if (sortBy === 'title') {
    sortOptions.title = sortDirection;
  } else {
    sortOptions.createdAt = sortDirection;
  }

  const tasks = await Task.find(query).sort(sortOptions);

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

/**
 * @desc    Fetch single task by MongoDB ObjectId
 * @route   GET /api/tasks/:id
 * @access  Public
 */
export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID '${id}' was not found`,
      error: 'TaskNotFound',
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  // Build clean task payload
  const taskData = {
    title: title.trim(),
    description: description ? description.trim() : '',
    status: status || 'Pending',
    priority: priority || 'Medium',
    dueDate: dueDate ? new Date(dueDate) : null,
  };

  const newTask = await Task.create(taskData);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask,
  });
});

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title.trim();
  if (description !== undefined) updateFields.description = description.trim();
  if (status !== undefined) updateFields.status = status;
  if (priority !== undefined) updateFields.priority = priority;
  if (dueDate !== undefined) {
    updateFields.dueDate = dueDate ? new Date(dueDate) : null;
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: `Cannot update. Task with ID '${id}' was not found`,
      error: 'TaskNotFound',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: updatedTask,
  });
});

/**
 * @desc    Update only task status (PATCH)
 * @route   PATCH /api/tasks/:id/status
 * @access  Public
 */
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: `Cannot update status. Task with ID '${id}' was not found`,
      error: 'TaskNotFound',
    });
  }

  res.status(200).json({
    success: true,
    message: `Task status updated to '${status}'`,
    data: updatedTask,
  });
});

/**
 * @desc    Delete a task by ID
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return res.status(404).json({
      success: false,
      message: `Cannot delete. Task with ID '${id}' was not found`,
      error: 'TaskNotFound',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: { id: deletedTask._id, title: deletedTask.title },
  });
});

/**
 * @desc    Fetch aggregated dashboard statistics
 * @route   GET /api/tasks/stats
 * @access  Public
 */
export const getTaskStats = asyncHandler(async (req, res) => {
  const now = new Date();

  // Run aggregations and counts in parallel for optimal performance
  const [total, pending, inProgress, completed, lowPriority, mediumPriority, highPriority, overdue] =
    await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: 'Pending' }),
      Task.countDocuments({ status: 'In Progress' }),
      Task.countDocuments({ status: 'Completed' }),
      Task.countDocuments({ priority: 'Low' }),
      Task.countDocuments({ priority: 'Medium' }),
      Task.countDocuments({ priority: 'High' }),
      Task.countDocuments({
        status: { $ne: 'Completed' },
        dueDate: { $lt: now, $ne: null },
      }),
    ]);

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  res.status(200).json({
    success: true,
    data: {
      total,
      pending,
      inProgress,
      completed,
      overdue,
      completionRate,
      priorityDistribution: {
        Low: lowPriority,
        Medium: mediumPriority,
        High: highPriority,
      },
    },
  });
});
