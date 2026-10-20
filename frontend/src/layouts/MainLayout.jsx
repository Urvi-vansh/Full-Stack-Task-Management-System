import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Toast from '../components/Toast.jsx';
import './MainLayout.css';

/**
 * MainLayout Component
 * Shared layout structure enclosing Navbar, responsive Sidebar, and main content Outlet.
 */
export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="layout-root">
      {/* Toast Notification Container */}
      <Toast />

      {/* Persistent Navigation Bar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* Layout Body: Sidebar + Main Content Viewport */}
      <div className="layout-body">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="layout-main" id="main-content">
          <div className="layout-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
