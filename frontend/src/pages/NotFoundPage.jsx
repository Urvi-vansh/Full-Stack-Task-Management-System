import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import './NotFoundPage.css';

/**
 * NotFoundPage Component
 * Wildcard fallback for any non-existent client routes (*).
 */
export const NotFoundPage = () => {
  useDocumentTitle('404 – Page Not Found');

  return (
    <div className="not-found-page animate-fade-in">
      <div className="not-found-card card">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page or resource you are looking for does not exist, may have been moved, or the URL might be mistyped.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Return to Dashboard
          </Link>
          <Link to="/tasks" className="btn btn-secondary">
            View All Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
