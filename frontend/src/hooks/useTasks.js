import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';

/**
 * Custom Hook to consume TaskContext safely.
 * Throws an informative error if used outside a TaskProvider.
 */
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default useTasks;
