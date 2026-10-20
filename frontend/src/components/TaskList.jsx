import React from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard.jsx';
import './TaskList.css';

/**
 * TaskList Component
 * Renders a responsive grid of TaskCards with stable MongoDB _id keys.
 * Handles empty search/filter states gracefully.
 */
export const TaskList = ({
  tasks = [],
  onStatusChange,
  onDeleteClick,
  onResetFilters,
  hasActiveFilters = false,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty card">
        <div className="empty-illustration" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 14l2 2 4-4" />
          </svg>
        </div>
        <h3 className="empty-title">
          {hasActiveFilters ? 'No tasks match your filters' : 'No tasks created yet'}
        </h3>
        <p className="empty-subtitle">
          {hasActiveFilters
            ? 'Try adjusting your search query, status, or priority criteria to see more tasks.'
            : 'Get started by creating your first task to track progress and due dates.'}
        </p>

        <div className="empty-actions">
          {hasActiveFilters ? (
            <button type="button" className="btn btn-secondary" onClick={onResetFilters}>
              Reset Filters
            </button>
          ) : (
            <Link to="/tasks/new" className="btn btn-primary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create First Task
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onStatusChange={onStatusChange}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default TaskList;
