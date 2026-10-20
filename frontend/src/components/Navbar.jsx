import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component
 * Responsive top application bar with branding, mobile drawer trigger, and quick action.
 */
export const Navbar = ({ onToggleSidebar }) => {
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="navbar-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">TaskFlow</span>
            <span className="brand-tag">MERN Stack</span>
          </div>
        </Link>
      </div>

      <div className="navbar-right">
        {/* Date Display */}
        <div className="navbar-date-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{todayFormatted}</span>
        </div>

        {/* Quick CTA */}
        <Link to="/tasks/new" className="btn btn-primary btn-sm navbar-cta">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>New Task</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
