import React from 'react';
import './LoadingSpinner.css';

/**
 * Reusable Loading Spinner Component
 * Used for page-level Suspense fallbacks and async data fetching states.
 */
export const LoadingSpinner = ({ message = 'Loading...', size = 'medium', fullPage = false }) => {
  const containerClasses = `spinner-container ${fullPage ? 'spinner-fullpage' : ''} ${size}`;

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="spinner-ring" aria-hidden="true">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {message && <p className="spinner-text">{message}</p>}
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingSpinner;
