import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import CreateTaskPage from './pages/CreateTaskPage.jsx';
import EditTaskPage from './pages/EditTaskPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

/**
 * Performance Optimization: Lazy Loading with React.lazy() and Suspense
 * Non-critical routes (TaskDetailsPage and AboutPage) are split into separate bundles.
 * Loaded on demand only when the user navigates to those specific routes,
 * minimizing initial page load size and accelerating First Contentful Paint (FCP).
 */
const TaskDetailsPage = lazy(() => import('./pages/TaskDetailsPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));

/**
 * Root Application Component
 * Configures client-side routing with React Router DOM.
 */
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Main Dashboard Route */}
        <Route index element={<DashboardPage />} />

        {/* Task Management Routes */}
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/new" element={<CreateTaskPage />} />
        <Route path="tasks/:id/edit" element={<EditTaskPage />} />

        {/* Lazy Loaded Routes wrapped in Suspense */}
        <Route
          path="tasks/:id"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading task details..." fullPage />}>
              <TaskDetailsPage />
            </Suspense>
          }
        />

        <Route
          path="about"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading documentation..." fullPage />}>
              <AboutPage />
            </Suspense>
          }
        />

        {/* Wildcard 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
