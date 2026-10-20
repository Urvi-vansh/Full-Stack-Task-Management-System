import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import './Sidebar.css';

/**
 * Sidebar Component
 * Persistent navigation panel with active link highlights, count badge, and database status indicator.
 */
export const Sidebar = ({ isOpen, onClose }) => {
  const { tasks, stats } = useTasks();

  const totalTasks = stats?.total ?? tasks?.length ?? 0;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true"></div>}

      <aside className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-section">
          <p className="sidebar-label">Navigation</p>
          <nav className="sidebar-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/tasks"
              end
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <span>All Tasks</span>
              {totalTasks > 0 && <span className="sidebar-counter">{totalTasks}</span>}
            </NavLink>

            <NavLink
              to="/tasks/new"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <span>Create Task</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Documentation</p>
          <nav className="sidebar-nav">
            <NavLink
              to="/about"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>About & 13 Concepts</span>
            </NavLink>
          </nav>
        </div>

        {/* Database & System Info Box */}
        <div className="sidebar-footer">
          <div className="db-status-pill">
            <span className="status-ping-dot"></span>
            <div className="db-status-text">
              <strong className="db-title">MongoDB Active</strong>
              <small className="db-subtitle">REST API Connected</small>
            </div>
          </div>
          <p className="sidebar-version">TaskFlow v1.0 • B.Tech Practical</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
