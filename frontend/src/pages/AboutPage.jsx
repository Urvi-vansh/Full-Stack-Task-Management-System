import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import './AboutPage.css';

/**
 * AboutPage Component (Lazy-Loaded)
 * Serves as an educational practical examination companion.
 * Maps all 13 core full-stack software concepts to their exact source implementations.
 */
export const AboutPage = () => {
  useDocumentTitle('About & 13 Concepts');
  const [activeTab, setActiveTab] = useState('concepts');

  const concepts = [
    {
      id: 1,
      title: 'Component Architecture',
      tag: 'Frontend',
      summary: 'Modular, decoupled UI building blocks.',
      details:
        'Small, reusable components (TaskCard, TaskList, TaskForm, StatisticsCard, LoadingSpinner, ConfirmationModal) with strict single-responsibility principles.',
      codeFile: 'frontend/src/components/TaskCard.jsx',
    },
    {
      id: 2,
      title: 'Frontend Architecture',
      tag: 'Architecture',
      summary: 'Feature-based layered separation of concerns.',
      details:
        'Clear layer separation: Presentation (components, pages), State (context, reducers), Services (Axios HTTP client), Utilities (date formatters, constants), and Custom Hooks.',
      codeFile: 'frontend/src/services/taskService.js',
    },
    {
      id: 3,
      title: 'State Management',
      tag: 'State',
      summary: 'Centralized global store + local component state.',
      details:
        'Global state using React Context API + useReducer for predictable CRUD transitions; local useState for form fields, modal visibility, and search inputs.',
      codeFile: 'frontend/src/context/taskReducer.js',
    },
    {
      id: 4,
      title: 'Routing',
      tag: 'SPA',
      summary: 'Client-side SPA navigation without full page reloads.',
      details:
        'React Router DOM v7 with a persistent MainLayout containing shared Navbar and Sidebar, parameterized routes (/tasks/:id, /tasks/:id/edit), and wildcard 404 handler.',
      codeFile: 'frontend/src/App.jsx',
    },
    {
      id: 5,
      title: 'API Integration',
      tag: 'Network',
      summary: 'Standardized Axios HTTP communication layer.',
      details:
        'Configured Axios instance with request and response interceptors, custom error handling, async/await CRUD methods, and loading/empty/error state management.',
      codeFile: 'frontend/src/services/api.js',
    },
    {
      id: 6,
      title: 'Rendering Lifecycle',
      tag: 'React Core',
      summary: 'Functional component lifecycle hooks and cleanup.',
      details:
        'useEffect with empty dependency array [] for mount/unmount effects, state dependencies [id, counter] for update effects, and returned cleanup functions for clearing timers and listeners.',
      codeFile: 'frontend/src/components/LifecycleDemo.jsx',
    },
    {
      id: 7,
      title: 'Performance Optimization',
      tag: 'Optimization',
      summary: 'Memoization, debouncing, and stable references.',
      details:
        'React.memo on TaskCard & StatisticsCard to avoid unnecessary re-renders; useMemo for filtered/sorted lists; useCallback for stable handlers; useDebounce for search inputs.',
      codeFile: 'frontend/src/pages/TasksPage.jsx',
    },
    {
      id: 8,
      title: 'Lazy Loading',
      tag: 'Optimization',
      summary: 'Code splitting with React.lazy() and Suspense.',
      details:
        'Non-critical pages (TaskDetailsPage, AboutPage) are split into separate JavaScript chunks loaded on-demand, reducing initial bundle size and initial paint time.',
      codeFile: 'frontend/src/App.jsx',
    },
    {
      id: 9,
      title: 'RESTful API Design',
      tag: 'Backend',
      summary: 'Predictable HTTP verbs, resource endpoints, and status codes.',
      details:
        'Standardized endpoints: GET /api/tasks, GET /api/tasks/:id, POST /api/tasks, PUT /api/tasks/:id, PATCH /api/tasks/:id/status, DELETE /api/tasks/:id, GET /api/tasks/stats with 200, 201, 400, 404, 500 codes.',
      codeFile: 'backend/src/controllers/taskController.js',
    },
    {
      id: 10,
      title: 'Middleware',
      tag: 'Express',
      summary: 'Sequential request processing pipeline.',
      details:
        'Custom requestLogger (method, URL, status, ms), validateTask (express-validator error checking), notFoundHandler (404), and centralized errorHandler (formatting Mongoose and HTTP errors).',
      codeFile: 'backend/src/middleware/requestLogger.js',
    },
    {
      id: 11,
      title: 'MongoDB Integration',
      tag: 'Database',
      summary: 'Mongoose ODM connection and database operations.',
      details:
        'Mongoose connection with error and disconnect listeners, .env connection string (MONGODB_URI), and automated seed script for sample tasks.',
      codeFile: 'backend/src/config/db.js',
    },
    {
      id: 12,
      title: 'Schema Enforcement',
      tag: 'Database',
      summary: 'Strict data models and constraints.',
      details:
        'Mongoose Schema with required fields, min/max length, trim, enum validators (Status: Pending/In Progress/Completed; Priority: Low/Medium/High), and automatic createdAt/updatedAt timestamps.',
      codeFile: 'backend/src/models/Task.js',
    },
    {
      id: 13,
      title: 'Validation',
      tag: 'Security & Integrity',
      summary: 'Three-tier defense: Client, Server, and Database.',
      details:
        'Layer 1: Frontend inline form validation; Layer 2: Express body and ObjectId param validation via express-validator; Layer 3: Mongoose schema database constraints.',
      codeFile: 'backend/src/validators/taskValidator.js',
    },
  ];

  return (
    <div className="about-page animate-fade-in">
      {/* Hero Section */}
      <section className="about-hero card">
        <span className="about-tag">B.Tech IT Full-Stack Practical</span>
        <h1 className="about-title">TaskFlow – Full-Stack Task Management System</h1>
        <p className="about-intro">
          TaskFlow is a production-grade MERN web application engineered to demonstrate the 13 foundational
          pillars of modern full-stack web software engineering.
        </p>
      </section>

      {/* Tabs */}
      <div className="about-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'concepts' ? 'active' : ''}`}
          onClick={() => setActiveTab('concepts')}
        >
          13 Required Concepts
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          System Architecture
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          REST API Specification
        </button>
      </div>

      {/* Concepts Tab Content */}
      {activeTab === 'concepts' && (
        <section className="concepts-grid">
          {concepts.map((concept) => (
            <div key={concept.id} className="concept-card card">
              <div className="concept-card-top">
                <span className="concept-number">Concept #{concept.id}</span>
                <span className="badge badge-priority-low">{concept.tag}</span>
              </div>
              <h3 className="concept-name">{concept.title}</h3>
              <p className="concept-summary">{concept.summary}</p>
              <p className="concept-details">{concept.details}</p>
              <div className="concept-code-link">
                <span className="code-label">Implementation:</span>
                <code>{concept.codeFile}</code>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Architecture Tab Content */}
      {activeTab === 'architecture' && (
        <section className="architecture-section card">
          <h2 className="section-title">End-to-End System Architecture</h2>
          <p className="section-text">
            The application follows a decoupled client-server architecture communicating over asynchronous JSON HTTP REST APIs:
          </p>

          <div className="architecture-diagram">
            <div className="arch-layer">
              <div className="arch-box arch-client">
                <h4>React Client (Vite)</h4>
                <ul>
                  <li>React Router DOM (SPA Routing)</li>
                  <li>Context API + useReducer (State)</li>
                  <li>Axios HTTP Client Service</li>
                  <li>Vanilla CSS Design System</li>
                </ul>
              </div>
            </div>

            <div className="arch-arrow">
              <span>HTTP / JSON (Port 5000)</span>
              <div className="arrow-line">&harr;</div>
            </div>

            <div className="arch-layer">
              <div className="arch-box arch-server">
                <h4>Node.js + Express API</h4>
                <ul>
                  <li>requestLogger Middleware</li>
                  <li>express-validator Middleware</li>
                  <li>taskController (CRUD Logic)</li>
                  <li>errorHandler (Centralized)</li>
                </ul>
              </div>
            </div>

            <div className="arch-arrow">
              <span>Mongoose TCP</span>
              <div className="arrow-line">&harr;</div>
            </div>

            <div className="arch-layer">
              <div className="arch-box arch-db">
                <h4>MongoDB Database</h4>
                <ul>
                  <li>taskflow_db Database</li>
                  <li>tasks Collection</li>
                  <li>Schema Enforcement & Indexes</li>
                  <li>Automatic Timestamps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* API Tab Content */}
      {activeTab === 'api' && (
        <section className="api-spec-section card">
          <h2 className="section-title">RESTful API Endpoints</h2>
          <div className="table-responsive">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Endpoint</th>
                  <th>Description</th>
                  <th>Status Codes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="badge-method get">GET</span></td>
                  <td><code>/api/tasks</code></td>
                  <td>Fetch all tasks with optional status, priority, and search filters</td>
                  <td>200 OK</td>
                </tr>
                <tr>
                  <td><span className="badge-method get">GET</span></td>
                  <td><code>/api/tasks/stats</code></td>
                  <td>Fetch dashboard statistics and status breakdown</td>
                  <td>200 OK</td>
                </tr>
                <tr>
                  <td><span className="badge-method get">GET</span></td>
                  <td><code>/api/tasks/:id</code></td>
                  <td>Fetch single task by MongoDB ObjectId</td>
                  <td>200, 400 (Bad ID), 404 (Not Found)</td>
                </tr>
                <tr>
                  <td><span className="badge-method post">POST</span></td>
                  <td><code>/api/tasks</code></td>
                  <td>Create a new task with validation</td>
                  <td>201 Created, 400 (Validation Error)</td>
                </tr>
                <tr>
                  <td><span className="badge-method put">PUT</span></td>
                  <td><code>/api/tasks/:id</code></td>
                  <td>Full update of an existing task</td>
                  <td>200 OK, 400, 404</td>
                </tr>
                <tr>
                  <td><span className="badge-method patch">PATCH</span></td>
                  <td><code>/api/tasks/:id/status</code></td>
                  <td>Quick update of task status only</td>
                  <td>200 OK, 400, 404</td>
                </tr>
                <tr>
                  <td><span className="badge-method delete">DELETE</span></td>
                  <td><code>/api/tasks/:id</code></td>
                  <td>Permanently delete a task</td>
                  <td>200 OK, 400, 404</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;
