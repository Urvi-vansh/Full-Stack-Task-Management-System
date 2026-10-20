import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import TaskForm from '../components/TaskForm.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import './EditTaskPage.css';

/**
 * EditTaskPage Component
 * Fetches an existing task by ID on mount and renders TaskForm in edit mode.
 */
export const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTask, detailLoading, error, fetchTaskById, updateTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useDocumentTitle(currentTask ? `Edit: ${currentTask.title}` : 'Edit Task');

  useEffect(() => {
    if (id) {
      fetchTaskById(id);
    }
  }, [id, fetchTaskById]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateTask(id, formData);
      navigate(`/tasks/${id}`);
    } catch (err) {
      // Handled in Context
    } finally {
      setIsSubmitting(false);
    }
  };

  if (detailLoading) {
    return <LoadingSpinner message="Loading task details for editing..." fullPage />;
  }

  if (error && !currentTask) {
    return (
      <div className="form-page animate-fade-in">
        <ErrorMessage message={error} onRetry={() => fetchTaskById(id)} />
        <Link to="/tasks" className="btn btn-secondary">
          &larr; Return to Task List
        </Link>
      </div>
    );
  }

  return (
    <div className="form-page animate-fade-in">
      <nav className="page-breadcrumb" aria-label="Breadcrumb">
        <Link to={`/tasks/${id}`} className="breadcrumb-link">
          &larr; Back to Task Details
        </Link>
      </nav>

      <div className="form-page-header">
        <h1 className="page-title">Edit Task</h1>
        <p className="page-subtitle">
          Update the task title, description, execution status, priority level, or due date.
        </p>
      </div>

      {currentTask && (
        <TaskForm
          initialValues={currentTask}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditMode={true}
        />
      )}
    </div>
  );
};

export default EditTaskPage;
