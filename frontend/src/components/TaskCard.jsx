import React from 'react';
import { Link } from 'react-router-dom';
import { STATUS_CONFIG, PRIORITY_CONFIG, STATUS_OPTIONS } from '../utils/constants.js';
import { formatDate, formatRelativeTime, isTaskOverdue } from '../utils/dateUtils.js';
import './TaskCard.css';

/**
 * TaskCard Component
 * Wrapped in React.memo for high rendering performance in long lists.
 * Provides quick status toggle, priority indicator, due-date awareness, and action links.
 */
export const TaskCard = React.memo(
  ({
    task,
    onStatusChange,
    onDeleteClick,
  }) => {
    const { _id, title, description, status, priority, dueDate, createdAt } = task;

    const statusInfo = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
    const priorityInfo = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.Medium;
    const isOverdue = isTaskOverdue(dueDate, status);
    const relativeTime = formatRelativeTime(dueDate);

    return (
      <div className={`task-card card ${isOverdue ? 'task-card-overdue' : ''}`}>
        <div className="task-card-top">
          {/* Priority Badge */}
          <span className={`badge ${priorityInfo.badgeClass}`}>
            {priority} Priority
          </span>

          {/* Quick Status Dropdown */}
          <div className="status-dropdown-wrapper">
            <select
              className={`status-select ${statusInfo.badgeClass}`}
              value={status}
              onChange={(e) => onStatusChange(_id, e.target.value)}
              title="Click to update status quickly"
              aria-label={`Update status for ${title}`}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Task Title */}
        <h3 className="task-card-title">
          <Link to={`/tasks/${_id}`} className="task-title-link">
            {title}
          </Link>
        </h3>

        {/* Task Description */}
        <p className="task-card-desc">
          {description ? description : <em className="text-muted">No description provided</em>}
        </p>

        {/* Due Date & Meta */}
        <div className="task-card-meta">
          <div className={`meta-due-date ${isOverdue ? 'overdue-alert' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>
              {formatDate(dueDate)}
              {relativeTime && <small className="meta-relative"> ({relativeTime})</small>}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="task-card-footer">
          <Link to={`/tasks/${_id}`} className="btn-icon" title="View details" aria-label="View details">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="btn-icon-text">Details</span>
          </Link>

          <Link to={`/tasks/${_id}/edit`} className="btn-icon" title="Edit task" aria-label="Edit task">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span className="btn-icon-text">Edit</span>
          </Link>

          <button
            type="button"
            className="btn-icon btn-icon-danger"
            onClick={() => onDeleteClick(task)}
            title="Delete task"
            aria-label="Delete task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            <span className="btn-icon-text">Delete</span>
          </button>
        </div>
      </div>
    );
  }
);

TaskCard.displayName = 'TaskCard';

export default TaskCard;
