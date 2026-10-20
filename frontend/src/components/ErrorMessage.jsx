import React from 'react';
import './ErrorMessage.css';

/**
 * Reusable ErrorMessage Component
 * Renders an accessible alert box with optional retry callback.
 */
export const ErrorMessage = ({ message, onRetry, title = 'Something went wrong' }) => {
  if (!message) return null;

  return (
    <div className="error-message-card" role="alert">
      <div className="error-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="error-content">
        <h4 className="error-title">{title}</h4>
        <p className="error-text">{message}</p>
        {onRetry && (
          <button className="btn btn-sm btn-secondary error-retry-btn" onClick={onRetry}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
