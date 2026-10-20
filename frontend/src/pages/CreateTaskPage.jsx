import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import TaskForm from '../components/TaskForm.jsx';
import './CreateTaskPage.css';

/**
 * CreateTaskPage Component
 * Handles creation of new tasks, providing breadcrumb navigation and submitting to Context.
 */
export const CreateTaskPage = () => {
  useDocumentTitle('Create Task');
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createTask(formData);
      navigate('/tasks');
    } catch (err) {
      // Handled in Context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page animate-fade-in">
      {/* Breadcrumb Navigation */}
      <nav className="page-breadcrumb" aria-label="Breadcrumb">
        <Link to="/tasks" className="breadcrumb-link">
          &larr; Back to Tasks
        </Link>
      </nav>

      {/* Header */}
      <div className="form-page-header">
        <h1 className="page-title">Create New Task</h1>
        <p className="page-subtitle">
          Add a new task with title, priority level, due date, and detailed instructions.
        </p>
      </div>

      {/* Task Form Component */}
      <TaskForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isEditMode={false}
      />
    </div>
  );
};

export default CreateTaskPage;
