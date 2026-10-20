import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import SearchBar from '../components/SearchBar.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import TaskList from '../components/TaskList.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import './TasksPage.css';

/**
 * TasksPage Component
 * Manages the entire task catalog:
 * - Local useState for filter controls and search text
 * - useDebounce to prevent aggressive re-filtering during typing
 * - useMemo to optimize client-side task filtering and sorting
 * - Confirmation modal before deletion
 */
export const TasksPage = () => {
  useDocumentTitle('All Tasks');

  const {
    tasks,
    loading,
    error,
    fetchTasks,
    updateTaskStatus,
    deleteTask,
  } = useTasks();

  // Local filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt-desc');

  // Modal state
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search term by 350ms
  const debouncedSearch = useDebounce(searchTerm, 350);

  // Initial fetch on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Performance Optimization: useMemo for client-side search, filter, and sorting
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Search filtering
    if (debouncedSearch.trim() !== '') {
      const query = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // 2. Status filtering
    if (statusFilter !== 'All') {
      result = result.filter((task) => task.status === statusFilter);
    }

    // 3. Priority filtering
    if (priorityFilter !== 'All') {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    // 4. Sorting
    result.sort((a, b) => {
      if (sortBy === 'createdAt-desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'createdAt-asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'dueDate-asc') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'dueDate-desc') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return result;
  }, [tasks, debouncedSearch, statusFilter, priorityFilter, sortBy]);

  const hasActiveFilters =
    searchTerm !== '' || statusFilter !== 'All' || priorityFilter !== 'All';

  // Reset filters callback
  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setSortBy('createdAt-desc');
  }, []);

  // Quick status update callback
  const handleStatusChange = useCallback(
    (id, newStatus) => {
      updateTaskStatus(id, newStatus);
    },
    [updateTaskStatus]
  );

  // Deletion modal handlers
  const handleDeleteClick = useCallback((task) => {
    setTaskToDelete(task);
  }, []);

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete._id, taskToDelete.title);
      setTaskToDelete(null);
    } catch (err) {
      // Handled in context
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    if (!isDeleting) {
      setTaskToDelete(null);
    }
  };

  return (
    <div className="tasks-page animate-fade-in">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!taskToDelete}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task from the database?"
        taskTitle={taskToDelete?.title}
        confirmText="Yes, Delete"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Top Header */}
      <div className="tasks-page-header">
        <div>
          <h1 className="page-title">Tasks Management</h1>
          <p className="page-subtitle">
            Search, filter, organize, and monitor all active tasks.
          </p>
        </div>

        <Link to="/tasks/new" className="btn btn-primary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Task
        </Link>
      </div>

      {/* Search Input Bar */}
      <div className="tasks-search-section">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
      </div>

      {/* Filter and Sorting Controls */}
      <FilterPanel
        status={statusFilter}
        priority={priorityFilter}
        sortBy={sortBy}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onSortChange={setSortBy}
        onReset={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Active Results Summary */}
      <div className="tasks-meta-bar">
        <span className="results-count">
          Showing <strong>{filteredTasks.length}</strong> of <strong>{tasks.length}</strong> tasks
          {hasActiveFilters && ' (filtered)'}
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage message={error} onRetry={() => fetchTasks()} />
      )}

      {/* Loading Spinner or Task List */}
      {loading && tasks.length === 0 ? (
        <LoadingSpinner message="Fetching tasks from MongoDB..." />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDeleteClick={handleDeleteClick}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      )}
    </div>
  );
};

export default TasksPage;
