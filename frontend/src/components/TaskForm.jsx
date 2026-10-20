import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants.js';
import { formatDateForInput } from '../utils/dateUtils.js';
import './TaskForm.css';

/**
 * TaskForm Component
 * Shared form for Creating and Editing tasks.
 * Demonstrates local useState for form fields and inline multi-layer validation.
 */
export const TaskForm = ({
  initialValues = null,
  onSubmit,
  isSubmitting = false,
  isEditMode = false,
}) => {
  const navigate = useNavigate();

  // Local component state for form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });

  // Inline validation errors state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Populate form if initialValues change (e.g. when editing an existing task)
  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        status: initialValues.status || 'Pending',
        priority: initialValues.priority || 'Medium',
        dueDate: initialValues.dueDate ? formatDateForInput(initialValues.dueDate) : '',
      });
    }
  }, [initialValues]);

  // Client-side field validator
  const validateField = (name, value) => {
    let error = '';

    if (name === 'title') {
      const trimmed = value.trim();
      if (!trimmed) {
        error = 'Task title is required';
      } else if (trimmed.length < 3) {
        error = 'Title must be at least 3 characters long';
      } else if (trimmed.length > 100) {
        error = 'Title cannot exceed 100 characters';
      }
    }

    if (name === 'description') {
      if (value && value.length > 1000) {
        error = 'Description cannot exceed 1000 characters';
      }
    }

    if (name === 'status') {
      if (!STATUS_OPTIONS.includes(value)) {
        error = 'Invalid status selected';
      }
    }

    if (name === 'priority') {
      if (!PRIORITY_OPTIONS.includes(value)) {
        error = 'Invalid priority selected';
      }
    }

    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle onBlur to trigger validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) formErrors[key] = err;
    });

    setErrors(formErrors);

    // If validation fails, halt submission
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // Call parent submit handler
    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate ? formData.dueDate : null,
    });
  };

  return (
    <form className="task-form card" onSubmit={handleSubmit} noValidate>
      <div className="card-body">
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            <span>
              Task Title <span className="required-star">*</span>
            </span>
            <span className="char-count">{formData.title.length}/100</span>
          </label>
          <input
            id="task-title"
            name="title"
            type="text"
            className={`form-control ${errors.title && touched.title ? 'error' : ''}`}
            placeholder="e.g. Implement user authentication middleware"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={100}
            required
            autoFocus
          />
          {errors.title && touched.title && (
            <p className="form-error-msg" role="alert">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description Textarea */}
        <div className="form-group">
          <label htmlFor="task-description" className="form-label">
            <span>Description</span>
            <span className="char-count">{formData.description.length}/1000</span>
          </label>
          <textarea
            id="task-description"
            name="description"
            rows="4"
            className={`form-control ${errors.description && touched.description ? 'error' : ''}`}
            placeholder="Provide context, acceptance criteria, or relevant links..."
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={1000}
          />
          {errors.description && touched.description && (
            <p className="form-error-msg" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        {/* Row with Status, Priority, Due Date */}
        <div className="form-row">
          {/* Status Select */}
          <div className="form-group form-col">
            <label htmlFor="task-status" className="form-label">
              <span>Status</span>
            </label>
            <select
              id="task-status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Select */}
          <div className="form-group form-col">
            <label htmlFor="task-priority" className="form-label">
              <span>Priority</span>
            </label>
            <select
              id="task-priority"
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              {PRIORITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date Picker */}
          <div className="form-group form-col">
            <label htmlFor="task-dueDate" className="form-label">
              <span>Due Date</span>
            </label>
            <input
              id="task-dueDate"
              name="dueDate"
              type="date"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border-sm" aria-hidden="true"></span>
                Saving...
              </>
            ) : isEditMode ? (
              'Save Changes'
            ) : (
              'Create Task'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
