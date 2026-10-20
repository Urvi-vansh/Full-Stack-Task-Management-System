import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { STATUS_CONFIG, PRIORITY_CONFIG, STATUS_OPTIONS } from '../utils/constants.js';
import { formatDate, formatRelativeTime, isTaskOverdue } from '../utils/dateUtils.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import './TaskDetailsPage.css';

/**
 * TaskDetailsPage Component (Lazy-Loaded)
 * Displays in-depth information about a single task, full timestamps,
 * quick status buttons, edit trigger, and delete confirmation.
 */
export const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentTask,
    detailLoading,
    error,
    fetchTaskById,
    updateTaskStatus,
    deleteTask,
  } = useTasks();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useDocumentTitle(currentTask ? currentTask.title : 'Task Details');

  useEffect(() => {
    if (id) {
      fetchTaskById(id);
    }
  }, [id, fetchTaskById]);

  if (detailLoading) {
    return <LoadingSpinner message="Loading task details..." fullPage />;
  }

  if (error || !currentTask) {
    return (
      <div className="task-details-page animate-fade-in">
        <ErrorMessage
          title="Task Not Found"
          message={error || `Could not find a task with ID '${id}'`}
          onRetry={() => fetchTaskById(id)}
        />
        <Link to="/tasks" className="btn btn-secondary">
          &larr; Return to Tasks List
        </Link>
      </div>
    );
  }

  const { title, description, status, priority, dueDate, createdAt, updatedAt } = currentTask;
  const statusInfo = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  const priorityInfo = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.Medium;
  const isOverdue = isTaskOverdue(dueDate, status);
  const relativeDueDate = formatRelativeTime(dueDate);

  // Status quick update handler
  const handleStatusChange = (newStatus) => {
    if (newStatus !== status) {
      updateTaskStatus(id, newStatus);
    }
  };

  // Delete handlers
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(id, title);
      navigate('/tasks');
    } catch (err) {
      // Handled in Context
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="task-details-page animate-fade-in">
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task? This action cannot be reversed."
        taskTitle={title}
        confirmText="Yes, Delete Permanently"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Top Navigation */}
      <nav className="page-breadcrumb">
        <Link to="/tasks" className="breadcrumb-link">
          &larr; Back to All Tasks
        </Link>
      </nav>

      {/* Main Details Card */}
      <div className="details-card card">
        {/* Card Header */}
        <div className="details-header">
          <div className="details-badges">
            <span className={`badge ${priorityInfo.badgeClass}`}>
              {priority} Priority
            </span>
            <span className={`badge ${statusInfo.badgeClass}`}>
              <span className="badge-dot"></span>
              {status}
            </span>
            {isOverdue && (
              <span className="badge badge-priority-high">
                Overdue
              </span>
            )}
          </div>

          <div className="details-actions">
            <Link to={`/tasks/${id}/edit`} className="btn btn-sm btn-outline">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Task
            </Link>

            <button
              type="button"
              className="btn btn-sm btn-danger-outline"
              onClick={() => setShowDeleteModal(true)}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Task Title */}
        <h1 className="details-title">{title}</h1>

        {/* Status Quick Cycle Controls */}
        <div className="status-cycle-box">
          <span className="status-cycle-label">Change Status:</span>
          <div className="status-cycle-buttons">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`btn btn-sm ${
                  opt === status ? 'btn-primary' : 'btn-secondary'
                }`}
                onClick={() => handleStatusChange(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Task Description */}
        <div className="details-section">
          <h3 className="section-heading">Description</h3>
          <div className="details-desc">
            {description ? (
              description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p className="text-muted italic">No description provided for this task.</p>
            )}
          </div>
        </div>

        {/* Information Grid */}
        <div className="details-grid">
          <div className="details-grid-item">
            <span className="item-label">Due Date</span>
            <strong className={`item-value ${isOverdue ? 'text-danger' : ''}`}>
              {formatDate(dueDate)}
              {relativeDueDate && <span className="item-sub"> ({relativeDueDate})</span>}
            </strong>
          </div>

          <div className="details-grid-item">
            <span className="item-label">Created At</span>
            <strong className="item-value">
              {new Date(createdAt).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </strong>
          </div>

          <div className="details-grid-item">
            <span className="item-label">Last Updated</span>
            <strong className="item-value">
              {new Date(updatedAt).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </strong>
          </div>

          <div className="details-grid-item">
            <span className="item-label">MongoDB Document ID</span>
            <code className="item-code">{id}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
