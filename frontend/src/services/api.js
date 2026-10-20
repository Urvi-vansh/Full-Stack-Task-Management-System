import axios from 'axios';

/**
 * Centralized Axios API Client
 * Configures base URL, request timeout, and standardized error interception.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor (useful for attaching auth tokens or request metrics)
api.interceptors.request.use(
  (config) => {
    // Development request logging
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor (standardizes error messages and handles network drops)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Server responded with non-2xx status
      const data = error.response.data;
      if (data && data.message) {
        errorMessage = data.message;
      } else if (error.response.status === 404) {
        errorMessage = 'Requested resource not found.';
      } else if (error.response.status === 500) {
        errorMessage = 'Internal server error. Please check server logs.';
      }
    } else if (error.request) {
      // Request was made but no response received (Server offline or CORS block)
      errorMessage = 'Unable to reach TaskFlow backend. Ensure server is running on port 5000.';
    } else {
      errorMessage = error.message;
    }

    // Attach human-readable message to error object
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export default api;
