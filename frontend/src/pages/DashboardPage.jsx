import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import StatisticsCard from '../components/StatisticsCard.jsx';
import TaskCard from '../components/TaskCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import LifecycleDemo from '../components/LifecycleDemo.jsx';
import './DashboardPage.css';

/**
 * DashboardPage Component
 * Demonstrates:
 * - useEffect for initial data fetching on mount
 * - useMemo for derived metrics and high-priority filtering
 * - useCallback for stable deletion/status change handlers
 * - React.memo integration via StatisticsCard and TaskCard
 */
export const DashboardPage = () => {
  useDocumentTitle('Dashboard');

  const {
    tasks,
    stats,
    loading,
    statsLoading,
    error,
    fetchTasks,
    fetchStats,
    updateTaskStatus,
    deleteTask,
  } = useTasks();

  // State for delete confirmation modal
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initial fetch on page mount
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  // Performance Optimization: useMemo for high-priority pending tasks
  const highPriorityPendingTasks = useMemo(() => {
    return tasks
      .filter((t) => t.priority === 'High' && t.status !== 'Completed')
      .slice(0, 3);
  }, [tasks]);

  // Performance Optimization: useMemo for recently created tasks
  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [tasks]);

  // Handlers with useCallback for stable reference
  const handleStatusChange = useCallback(
    (id, newStatus) => {
      updateTaskStatus(id, newStatus);
    },
    [updateTaskStatus]
  );

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
      // Error handled in context
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
    <div className="dashboard-page animate-fade-in">
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!taskToDelete}
        title="Delete Task"
        message="Are you sure you want to permanently remove this task?"
        taskTitle={taskToDelete?.title}
        confirmText="Yes, Delete Task"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Header Bar */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Executive Dashboard</h1>
          <p className="page-subtitle">
            Welcome back! Here is the latest overview of your team's tasks and milestones.
          </p>
        </div>
        <div className="dashboard-header-actions">
          <Link to="/tasks/new" className="btn btn-primary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Task
          </Link>
        </div>
      </div>

      {/* Error Message if API fails */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            fetchTasks();
            fetchStats();
          }}
        />
      )}

      {/* Statistics Metric Cards */}
      <section className="stats-grid" aria-label="Dashboard Statistics">
        <StatisticsCard
          title="Total Tasks"
          value={stats?.total ?? 0}
          subtitle="All tasks across project"
          accentColor="blue"
          isLoading={statsLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          }
        />

        <StatisticsCard
          title="Pending"
          value={stats?.pending ?? 0}
          subtitle="Awaiting commencement"
          accentColor="amber"
          isLoading={statsLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />

        <StatisticsCard
          title="In Progress"
          value={stats?.inProgress ?? 0}
          subtitle="Currently active"
          accentColor="indigo"
          isLoading={statsLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
            </svg>
          }
        />

        <StatisticsCard
          title="Completed"
          value={stats?.completed ?? 0}
          subtitle={`${stats?.completionRate ?? 0}% overall completion`}
          accentColor="green"
          isLoading={statsLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
      </section>

      {/* Progress Bar Banner */}
      <section className="completion-card card">
        <div className="completion-header">
          <div>
            <h3 className="completion-title">Project Sprint Completion</h3>
            <p className="completion-subtitle">
              {stats?.completed ?? 0} of {stats?.total ?? 0} tasks finalized
            </p>
          </div>
          <span className="completion-percentage">{stats?.completionRate ?? 0}%</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={stats?.completionRate ?? 0} aria-valuemin="0" aria-valuemax="100">
          <div
            className="progress-fill"
            style={{ width: `${stats?.completionRate ?? 0}%` }}
          ></div>
        </div>
      </section>

      {/* High Priority Spotlight */}
      {highPriorityPendingTasks.length > 0 && (
        <section className="dashboard-section">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="badge badge-priority-high">Urgent Attention</span>
              <h2>High Priority Active Tasks</h2>
            </div>
            <Link to="/tasks" className="section-link">
              View All Tasks &rarr;
            </Link>
          </div>

          <div className="task-grid">
            {highPriorityPendingTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Tasks Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <div className="section-title-wrap">
            <h2>Recently Added Tasks</h2>
          </div>
          <Link to="/tasks" className="section-link">
            Explore Full List &rarr;
          </Link>
        </div>

        {loading && tasks.length === 0 ? (
          <LoadingSpinner message="Loading tasks from MongoDB..." />
        ) : recentTasks.length === 0 ? (
          <div className="card empty-card">
            <p>No tasks created yet.</p>
            <Link to="/tasks/new" className="btn btn-sm btn-primary">
              Create First Task
            </Link>
          </div>
        ) : (
          <div className="task-grid">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </section>

      {/* Educational Lifecycle Demo Widget */}
      <LifecycleDemo />
    </div>
  );
};

export default DashboardPage;
