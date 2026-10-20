import api from './api.js';

/**
 * Task Service Layer
 * Abstracts backend REST API communication away from UI components.
 */
export const taskService = {
  /**
   * Fetch all tasks with optional search, filter, and sort queries
   * @param {Object} params - { status, priority, search, sortBy, order }
   */
  async getTasks(params = {}) {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  /**
   * Fetch a single task by MongoDB ObjectId
   * @param {string} id - Task ID
   */
  async getTaskById(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Create a new task
   * @param {Object} taskData - { title, description, status, priority, dueDate }
   */
  async createTask(taskData) {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - updated fields
   */
  async updateTask(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  /**
   * Update only the task status
   * @param {string} id - Task ID
   * @param {string} status - 'Pending' | 'In Progress' | 'Completed'
   */
  async updateTaskStatus(id, status) {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a task by ID
   * @param {string} id - Task ID
   */
  async deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Fetch aggregated statistics for dashboard
   */
  async getTaskStats() {
    const response = await api.get('/tasks/stats');
    return response.data;
  },
};

export default taskService;
