import React, { createContext, useReducer, useCallback } from 'react';
import { taskReducer, initialState, ACTION_TYPES } from './taskReducer.js';
import taskService from '../services/taskService.js';

export const TaskContext = createContext(null);

/**
 * TaskProvider Component
 * Manages global task data, active filters, loading states, error states, and toast notifications.
 * Implements useReducer for predictable state transitions.
 */
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Helper to show floating toast notification
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    dispatch({
      type: ACTION_TYPES.ADD_TOAST,
      payload: { id, message, type },
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.REMOVE_TOAST,
        payload: id,
      });
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_TOAST,
      payload: id,
    });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  }, []);

  // Fetch all tasks with optional filters
  const fetchTasks = useCallback(async (params = {}) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
    try {
      const response = await taskService.getTasks(params);
      dispatch({
        type: ACTION_TYPES.FETCH_TASKS_SUCCESS,
        payload: response.data || [],
      });
      return response.data;
    } catch (error) {
      const msg = error.userMessage || 'Failed to fetch tasks';
      dispatch({
        type: ACTION_TYPES.FETCH_TASKS_ERROR,
        payload: msg,
      });
      showToast(msg, 'error');
      throw error;
    }
  }, [showToast]);

  // Fetch single task by ID
  const fetchTaskById = useCallback(async (id) => {
    dispatch({ type: ACTION_TYPES.SET_DETAIL_LOADING, payload: true });
    try {
      const response = await taskService.getTaskById(id);
      dispatch({
        type: ACTION_TYPES.FETCH_TASK_BY_ID_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      const msg = error.userMessage || `Failed to fetch task with ID: ${id}`;
      dispatch({
        type: ACTION_TYPES.FETCH_TASK_BY_ID_ERROR,
        payload: msg,
      });
      showToast(msg, 'error');
      throw error;
    }
  }, [showToast]);

  // Fetch dashboard statistics
  const fetchStats = useCallback(async () => {
    dispatch({ type: ACTION_TYPES.SET_STATS_LOADING, payload: true });
    try {
      const response = await taskService.getTaskStats();
      dispatch({
        type: ACTION_TYPES.FETCH_STATS_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // We don't block the UI if stats fail
    }
  }, []);

  // Create a new task
  const createTask = useCallback(async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      const newTask = response.data;
      dispatch({
        type: ACTION_TYPES.CREATE_TASK_SUCCESS,
        payload: newTask,
      });
      showToast(`Task "${newTask.title}" created successfully!`, 'success');
      // Refresh stats in background
      fetchStats();
      return newTask;
    } catch (error) {
      const msg = error.userMessage || 'Failed to create task';
      showToast(msg, 'error');
      throw error;
    }
  }, [showToast, fetchStats]);

  // Update existing task
  const updateTask = useCallback(async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData);
      const updatedTask = response.data;
      dispatch({
        type: ACTION_TYPES.UPDATE_TASK_SUCCESS,
        payload: updatedTask,
      });
      showToast(`Task "${updatedTask.title}" updated successfully!`, 'success');
      fetchStats();
      return updatedTask;
    } catch (error) {
      const msg = error.userMessage || 'Failed to update task';
      showToast(msg, 'error');
      throw error;
    }
  }, [showToast, fetchStats]);

  // Update only status
  const updateTaskStatus = useCallback(async (id, status) => {
    try {
      const response = await taskService.updateTaskStatus(id, status);
      const updatedTask = response.data;
      dispatch({
        type: ACTION_TYPES.UPDATE_TASK_SUCCESS,
        payload: updatedTask,
      });
      showToast(`Status updated to "${status}"`, 'info');
      fetchStats();
      return updatedTask;
    } catch (error) {
      const msg = error.userMessage || 'Failed to update task status';
      showToast(msg, 'error');
      throw error;
    }
  }, [showToast, fetchStats]);

  // Delete task
  const deleteTask = useCallback(async (id, taskTitle = 'Task') => {
    try {
      await taskService.deleteTask(id);
      dispatch({
        type: ACTION_TYPES.DELETE_TASK_SUCCESS,
        payload: id,
      });
      showToast(`"${taskTitle}" was deleted successfully`, 'success');
      fetchStats();
      return true;
    } catch (error) {
      const msg = error.userMessage || 'Failed to delete task';
      showToast(msg, 'error');
      throw error;
    }
  }, [showToast, fetchStats]);

  const value = {
    ...state,
    fetchTasks,
    fetchTaskById,
    fetchStats,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    showToast,
    removeToast,
    clearError,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
