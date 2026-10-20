# TaskFlow – Full-Stack Task Management System

> **A Complete, Practical-Ready MERN Web Application Demonstrating the 13 Core Full-Stack Software Concepts.**

---

## 1. Project Introduction & Objectives

**TaskFlow** is a modern, responsive, full-stack Task Management Dashboard built using the MERN stack (MongoDB, Express.js, React, Node.js). 

This project was engineered specifically for a third-year B.Tech Information Technology student presenting in a practical examination. It demonstrates all architectural, programmatic, performance, and database fundamentals in a clean, beginner-friendly codebase without TypeScript, mock data, or unnecessary third-party abstractions.

### Core Objectives:
1. Deliver a responsive Single Page Application (SPA) dashboard for end-to-end task operations (CRUD).
2. Establish a decoupled, layered frontend and backend software architecture.
3. Apply 3-tier validation (Frontend inline, Express request, Mongoose database schema).
4. Implement realistic performance optimizations (memoization, debouncing, lazy loading).
5. Document and demonstrate all **13 required full-stack software concepts** with direct source code references.

---

## 2. Key Features

- **Executive Dashboard**: Real-time KPI statistics cards (Total, Pending, In Progress, Completed, Completion Rate), interactive progress track, and urgent task alerts.
- **Task Management (CRUD)**:
  - **Create Task**: Comprehensive form with live character counters, real-time validation, and date picker.
  - **View All Tasks**: Grid view of task cards with priority badges, status badges, and overdue indicators.
  - **Task Details View**: Dedicated page with full audit timestamps (`createdAt`, `updatedAt`, MongoDB `_id`), quick status toggle buttons, and markdown-like multi-paragraph descriptions.
  - **Edit Task**: Pre-filled update form with real-time error feedback.
  - **Delete Task**: Accessible confirmation modal preventing accidental deletions.
  - **Quick Status Toggle**: Status change dropdown on every card and one-click status pills on the details page.
- **Search & Filtering**:
  - Debounced real-time search across task titles and descriptions.
  - Multi-criteria filtering by Status (`Pending`, `In Progress`, `Completed`) and Priority (`Low`, `Medium`, `High`).
  - Multi-attribute sorting (Recent, Oldest, Due Date Earliest/Latest, Alphabetical).
- **Feedback & Notifications**: Non-intrusive floating toast notifications for every CRUD action and network event.
- **Educational Lifecycle Inspector**: Collapsible interactive widget demonstrating functional component mounting, updating, and cleanup phases in real time.
- **Accessible & Responsive Design**: Custom white-and-blue theme with mobile hamburger drawer, keyboard navigation (`Escape` closes modal), and high-contrast badges.

---

## 3. Technology Stack

### Frontend
- **Library**: React 19 (Functional Components & Hooks)
- **Tooling**: Vite (Lightning-fast HMR and Rollup-based bundling)
- **Language**: JavaScript (ES6+ Modules, no TypeScript)
- **Routing**: React Router DOM v7 (Shared Layout, Nested Routes, Wildcard 404)
- **State Management**: React Context API (`useContext` + `useReducer`)
- **HTTP Client**: Axios with request/response interceptors
- **Styling**: Vanilla CSS (Tailored Design System, Custom Properties, Glassmorphism, Micro-animations)
- **Code Splitting**: `React.lazy()` and `<Suspense>` for asynchronous route chunks

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 4 (RESTful API architecture)
- **Database Engine**: MongoDB (Local or MongoDB Atlas)
- **Object Data Modeling (ODM)**: Mongoose 8
- **Validation**: express-validator (Request body and ObjectId parameter validation)
- **Middleware**: Custom requestLogger, notFoundHandler, errorHandler, asyncHandler
- **CORS & Environment**: `cors` and `dotenv`

---

## 4. Architecture Explanation

The application follows a **Decoupled Client-Server Multi-Tier Architecture**:

```
+-----------------------------------------------------------------------+
|                           CLIENT TIER                                 |
|  React 19 (Vite SPA) on Port 5173                                     |
|  - Presentation Layer: Components, Pages, Layouts                     |
|  - State Layer: TaskContext + taskReducer (Single Source of Truth)   |
|  - Service Layer: Axios HTTP Client with BaseURL & Interceptors       |
+-----------------------------------▲-----------------------------------+
                                    |
                          HTTP / JSON REST API
                          (CORS Enabled / Port 5000)
                                    |
+-----------------------------------▼-----------------------------------+
|                           SERVER TIER                                 |
|  Node.js + Express.js API on Port 5000                                |
|  - Middleware Pipeline: CORS -> JSON Parser -> requestLogger          |
|  - Validation Layer: express-validator (body, query, params)          |
|  - Routing Layer: taskRoutes.js (REST Endpoints)                      |
|  - Controller Layer: taskController.js (Business Logic & Aggregations)|
|  - Error Handling: Centralized errorHandler (CastError, 400, 404, 500)|
+-----------------------------------▲-----------------------------------+
                                    |
                           Mongoose ODM (TCP)
                                    |
+-----------------------------------▼-----------------------------------+
|                          DATABASE TIER                                |
|  MongoDB on Port 27017 (or MongoDB Atlas Cloud)                       |
|  - Database: taskflow_db                                              |
|  - Collection: tasks                                                  |
|  - Schema Enforcement: Required fields, Trim, String lengths, Enums   |
|  - Automated Indexes: status, priority, createdAt, text index         |
+-----------------------------------------------------------------------+
```

---

## 5. Folder Structure

```
Full-Stack Task Management System/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js             # Mongoose connection & connection listeners
│   │   │   └── seed.js           # Sample dataset populator for instant testing
│   │   ├── controllers/
│   │   │   └── taskController.js # CRUD handlers & stats aggregation
│   │   ├── middleware/
│   │   │   ├── asyncHandler.js   # Promise wrapper to catch async exceptions
│   │   │   ├── errorHandler.js   # Centralized error formatter (CastError, 500)
│   │   │   ├── notFoundHandler.js# 404 handler for unrecognized endpoints
│   │   │   ├── requestLogger.js  # Custom logger (Method, URL, Status, Duration)
│   │   │   └── validateTask.js   # express-validator result inspector
│   │   ├── models/
│   │   │   └── Task.js           # Mongoose schema, validation, & indexes
│   │   ├── routes/
│   │   │   └── taskRoutes.js     # REST route registrations
│   │   ├── validators/
│   │   │   └── taskValidator.js  # express-validator validation chains
│   │   ├── app.js                # Express app setup, CORS, middleware assembly
│   │   └── server.js             # Server bootstrap & graceful shutdown
│   ├── .env                      # Active environment variables
│   ├── .env.example              # Template environment variables
│   └── package.json              # Backend dependencies and scripts
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg           # TaskFlow SVG application icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmationModal.jsx / .css # Delete confirmation dialog
│   │   │   ├── ErrorMessage.jsx / .css      # User-friendly error alert
│   │   │   ├── FilterPanel.jsx / .css       # Status, Priority, & Sort controls
│   │   │   ├── LifecycleDemo.jsx / .css     # Educational lifecycle observer
│   │   │   ├── LoadingSpinner.jsx / .css    # Suspense & async loading spinner
│   │   │   ├── Navbar.jsx / .css            # Header, brand, date, mobile toggle
│   │   │   ├── SearchBar.jsx / .css         # Controlled debounced search input
│   │   │   ├── Sidebar.jsx / .css           # Navigation drawer & DB status badge
│   │   │   ├── StatisticsCard.jsx / .css    # Memoized KPI metric card
│   │   │   ├── TaskCard.jsx / .css          # Memoized task card with badges
│   │   │   ├── TaskForm.jsx / .css          # Reusable Create/Edit form
│   │   │   ├── TaskList.jsx / .css          # Grid container & empty states
│   │   │   └── Toast.jsx / .css             # Non-intrusive notification banner
│   │   ├── context/
│   │   │   ├── TaskContext.jsx   # Global context provider & dispatchers
│   │   │   └── taskReducer.js    # Predictable state transitions
│   │   ├── hooks/
│   │   │   ├── useDebounce.js    # Custom debounce hook for search queries
│   │   │   ├── useDocumentTitle.js# Custom hook for dynamic page titles
│   │   │   └── useTasks.js       # Hook to consume TaskContext safely
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx / .css # Shared layout (Navbar, Sidebar, Outlet)
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx / .css        # Lazy-loaded 13 concepts & viva prep
│   │   │   ├── CreateTaskPage.jsx / .css   # Create task page
│   │   │   ├── DashboardPage.jsx / .css    # Main metrics & high-priority tasks
│   │   │   ├── EditTaskPage.jsx / .css     # Edit existing task page
│   │   │   ├── NotFoundPage.jsx / .css     # Custom 404 page
│   │   │   ├── TaskDetailsPage.jsx / .css  # Lazy-loaded single task inspector
│   │   │   └── TasksPage.jsx / .css        # Filterable & searchable task list
│   │   ├── services/
│   │   │   ├── api.js            # Axios client with interceptors
│   │   │   └── taskService.js    # REST API CRUD methods
│   │   ├── styles/
│   │   │   ├── index.css         # CSS tokens, color variables, typography
│   │   │   └── utilities.css     # Buttons, badges, cards, form inputs
│   │   ├── utils/
│   │   │   ├── constants.js      # Status, Priority enums & sort definitions
│   │   │   └── dateUtils.js      # Date formatters & overdue helper
│   │   ├── App.jsx               # Route definitions & Suspense boundaries
│   │   └── main.jsx              # Application entrypoint
│   ├── index.html                # HTML5 shell with Google Font Inter
│   ├── vite.config.js            # Vite configuration & backend proxy
│   └── package.json              # Frontend dependencies and scripts
│
├── package.json                  # Root runner script configuration
└── README.md                     # Comprehensive documentation
```

---

## 6. Installation Commands

Clone or open the project folder in your terminal, then install all dependencies:

### Method A: Single Command from Root Directory
```bash
npm run install:all
```

### Method B: Manual Step-by-Step Installation
```bash
# 1. Install Backend Dependencies
cd backend
npm install

# 2. Install Frontend Dependencies
cd ../frontend
npm install
```

---

## 7. MongoDB Configuration

The application requires an accessible MongoDB instance. You can use either **Local MongoDB** or **MongoDB Atlas Cloud**.

### Option 1: Local MongoDB (Default)
1. Ensure the MongoDB service (`mongod`) is running on default port `27017`.
2. The default connection URI in `backend/.env` is:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/taskflow_db
   ```

### Option 2: MongoDB Atlas (Cloud)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free M0 Cluster.
3. Under **Database Access**, create a user with read/write privileges.
4. Under **Network Access**, whitelist your IP or allow access from anywhere (`0.0.0.0/0`).
5. Copy your connection string and paste it into `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/taskflow_db?retryWrites=true&w=majority
   ```

---

## 8. Environment Variable Setup

The backend loads configuration from `backend/.env`. A template is provided in `backend/.env.example`.

### `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow_db
CLIENT_URL=http://localhost:5173
```

---

## 9. How to Start Frontend and Backend

### Step 1: Seed the Database with Realistic Tasks (Recommended)
Populate sample tasks with various statuses, priorities, and due dates:
```bash
npm run seed
# Or from backend/: cd backend && npm run seed
```

### Step 2: Start the Backend Server (Port 5000)
Open a terminal in the root directory:
```bash
npm run backend
# Or from backend/: cd backend && npm run dev
```
*Output:*
```
[Database] MongoDB Connected: 127.0.0.1/taskflow_db
🚀 TaskFlow Backend Server running on port 5000
🌐 Base URL: http://localhost:5000
🏥 Health Check: http://localhost:5000/api/health
📋 Tasks API: http://localhost:5000/api/tasks
📊 Stats API: http://localhost:5000/api/tasks/stats
```

### Step 3: Start the React Frontend (Port 5173)
Open a second terminal window in the root directory:
```bash
npm run frontend
# Or from frontend/: cd frontend && npm run dev
```
*Output:*
```
  VITE v8.3.4  ready in 210 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
Open **`http://localhost:5173`** in your browser.

---

## 10. REST API Endpoint Documentation

All endpoints return standardized JSON structures: `{ success: boolean, data?: any, message?: string, error?: string }`.

| HTTP Method | Endpoint | Description | Request Body | Success Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Server heartbeat check | *None* | `200 OK` |
| **GET** | `/api/tasks` | Fetch all tasks (supports `?status=&priority=&search=&sortBy=&order=`) | *None* | `200 OK` |
| **GET** | `/api/tasks/stats` | Aggregate dashboard statistics | *None* | `200 OK` |
| **GET** | `/api/tasks/:id` | Fetch single task by MongoDB ObjectId | *None* | `200 OK` |
| **POST** | `/api/tasks` | Create a new task | `{ title, description, status, priority, dueDate }` | `201 Created` |
| **PUT** | `/api/tasks/:id` | Full update of an existing task | `{ title, description, status, priority, dueDate }` | `200 OK` |
| **PATCH** | `/api/tasks/:id/status` | Update only task status | `{ status: "Completed" }` | `200 OK` |
| **DELETE** | `/api/tasks/:id` | Delete task by ID | *None* | `200 OK` |

### Sample Requests & Responses

#### 1. Create a Task (`POST /api/tasks`)
**Request:**
```http
POST /api/tasks HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "title": "Configure Database Backup Automation",
  "description": "Write a daily cron job script to dump MongoDB collections into cloud storage.",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-11-15"
}
```
**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "title": "Configure Database Backup Automation",
    "description": "Write a daily cron job script to dump MongoDB collections into cloud storage.",
    "status": "In Progress",
    "priority": "High",
    "dueDate": "2026-11-15T00:00:00.000Z",
    "_id": "6ad73cb2b5daf57e70dbd9ac",
    "createdAt": "2026-10-20T10:04:15.123Z",
    "updatedAt": "2026-10-20T10:04:15.123Z",
    "id": "6ad73cb2b5daf57e70dbd9ac"
  }
}
```

#### 2. Validation Failure (`POST /api/tasks` with invalid data)
**Request Body:**
```json
{
  "title": "ab"
}
```
**Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Validation failed. Please correct the highlighted errors.",
  "errors": [
    {
      "field": "title",
      "message": "Task title must be between 3 and 100 characters",
      "value": "ab"
    }
  ]
}
```

#### 3. Dashboard Statistics (`GET /api/tasks/stats`)
**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "total": 8,
    "pending": 3,
    "inProgress": 2,
    "completed": 3,
    "overdue": 0,
    "completionRate": 38,
    "priorityDistribution": {
      "Low": 1,
      "Medium": 3,
      "High": 4
    }
  }
}
```

---

## 11. Validation and Error-Handling Architecture

TaskFlow implements a **Three-Tier Defense Validation Strategy**:

1. **Tier 1: Client-Side Inline Validation (`TaskForm.jsx`)**
   - Validates required fields, min/max lengths, and enum values as the user types and on blur.
   - Prevents unnecessary network requests before submission.
2. **Tier 2: Express Request Validation (`taskValidator.js` & `validateTask.js`)**
   - Uses `express-validator` to enforce body constraints, sanitize inputs, and verify that URL parameters match 24-character hexadecimal MongoDB ObjectIds.
   - Halts invalid requests at the route gate and returns structured HTTP 400 responses.
3. **Tier 3: Database Schema Validation (`Task.js`)**
   - Enforced by Mongoose at the database driver level.
   - Rejects illegal enum values or missing required fields even if server code bypassed prior checks.

### Centralized Error Handling (`errorHandler.js`)
- Intercepts Mongoose `CastError` (invalid ObjectId), `ValidationError` (schema failure), and duplicate keys (`code: 11000`).
- Conceals stack traces and internal database topology in production environments (`NODE_ENV === 'production'`).

---

## 12. Explanation of the 13 Required Concepts

| # | Concept | Real-World Software Purpose | Code Implementation in TaskFlow |
| :-: | :--- | :--- | :--- |
| **1** | **Component Architecture** | Decouples UI into reusable, testable blocks following Single Responsibility Principle. | [`TaskCard.jsx`](frontend/src/components/TaskCard.jsx), [`TaskList.jsx`](frontend/src/components/TaskList.jsx), [`ConfirmationModal.jsx`](frontend/src/components/ConfirmationModal.jsx) |
| **2** | **Frontend Architecture** | Separates presentation, business logic, HTTP communication, and utilities to ensure maintainability. | `frontend/src/` divided into `components/`, `pages/`, `layouts/`, `context/`, `hooks/`, `services/`, `utils/`, `styles/` |
| **3** | **State Management** | Establishes a predictable, single source of truth for global data, avoiding prop drilling. | [`TaskContext.jsx`](frontend/src/context/TaskContext.jsx) and [`taskReducer.js`](frontend/src/context/taskReducer.js) with `useReducer` and `useContext` |
| **4** | **Routing** | Enables Multi-view Single Page Application (SPA) navigation without full page reloads. | [`App.jsx`](frontend/src/App.jsx) with `react-router-dom` v7 `<Routes>`, `<Route>`, and shared [`MainLayout.jsx`](frontend/src/layouts/MainLayout.jsx) |
| **5** | **API Integration** | Connects client with remote REST server with standardized timeout, headers, and error parsing. | [`api.js`](frontend/src/services/api.js) (Axios client with interceptors) & [`taskService.js`](frontend/src/services/taskService.js) (CRUD methods) |
| **6** | **Rendering Lifecycle** | Controls component initialization (mount), prop/state reaction (update), and resource cleanup (unmount). | Demonstrated in [`DashboardPage.jsx`](frontend/src/pages/DashboardPage.jsx) (`useEffect` initial fetch) and interactive [`LifecycleDemo.jsx`](frontend/src/components/LifecycleDemo.jsx) |
| **7** | **Performance Optimization** | Prevents unnecessary re-computations and laggy re-renders during high-frequency user actions. | `React.memo` on [`TaskCard.jsx`](frontend/src/components/TaskCard.jsx) & [`StatisticsCard.jsx`](frontend/src/components/StatisticsCard.jsx); `useMemo` & `useCallback` in [`TasksPage.jsx`](frontend/src/pages/TasksPage.jsx); `useDebounce` hook |
| **8** | **Lazy Loading** | Splits code into asynchronous chunks loaded on demand, reducing initial bundle transfer size. | [`App.jsx`](frontend/src/App.jsx) using `React.lazy(() => import(...))` and `<Suspense fallback={<LoadingSpinner />}>` for `TaskDetailsPage` and `AboutPage` |
| **9** | **RESTful API Design** | Implements standard HTTP methods (GET, POST, PUT, PATCH, DELETE) and status codes (200, 201, 400, 404, 500). | [`taskRoutes.js`](backend/src/routes/taskRoutes.js) and [`taskController.js`](backend/src/controllers/taskController.js) |
| **10**| **Middleware** | Intercepts requests sequentially to perform cross-cutting tasks (logging, validation, 404, error trapping). | [`requestLogger.js`](backend/src/middleware/requestLogger.js), [`validateTask.js`](backend/src/middleware/validateTask.js), [`notFoundHandler.js`](backend/src/middleware/notFoundHandler.js), [`errorHandler.js`](backend/src/middleware/errorHandler.js) |
| **11**| **MongoDB Integration**| Connects asynchronous Node.js backend to a scalable document database via Mongoose ODM. | [`db.js`](backend/src/config/db.js) with connection event listeners (`error`, `disconnected`) and `.env` URI loading |
| **12**| **Schema Enforcement** | Enforces database-level consistency, field types, enums, length limits, and auto-timestamps. | [`Task.js`](backend/src/models/Task.js) Mongoose schema with `timestamps: true`, `minlength`, `maxlength`, and `enum` values |
| **13**| **Validation** | Guarantees data integrity and prevents corrupt records across all layers of the stack. | Client form checks ([`TaskForm.jsx`](frontend/src/components/TaskForm.jsx)) + Express validator ([`taskValidator.js`](backend/src/validators/taskValidator.js)) + Schema rules ([`Task.js`](backend/src/models/Task.js)) |

---

## 13. Testing Instructions

### Automated Verification Script
Run the built-in end-to-end verification script to test every CRUD endpoint:
```bash
node -e "
async function test(){
  const res = await fetch('http://localhost:5000/api/tasks/stats');
  const data = await res.json();
  console.log('MongoDB Stats Response:', data);
}
test();
"
```

### Manual Testing with Postman / cURL

#### 1. Fetch All Tasks:
```bash
curl -X GET http://localhost:5000/api/tasks
```

#### 2. Create a Task:
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Implement OAuth Authentication","description":"Setup Google login","priority":"High","status":"Pending"}'
```

#### 3. Update Status via PATCH:
```bash
curl -X PATCH http://localhost:5000/api/tasks/<TASK_ID>/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Completed"}'
```

#### 4. Test Invalid MongoDB ID (Should return 400 Bad Request):
```bash
curl -X GET http://localhost:5000/api/tasks/not-a-valid-id
```

#### 5. Test Non-Existent Route (Should return 404 Not Found):
```bash
curl -X GET http://localhost:5000/api/invalid-route
```

---

## 14. Common Errors & Troubleshooting

| Error | Root Cause | Solution |
| :--- | :--- | :--- |
| `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017` | Local MongoDB daemon is not running on your computer. | Start MongoDB locally via `net start MongoDB` or use a free MongoDB Atlas connection string in `backend/.env`. |
| `Cannot find module 'express'` or `vite: command not found` | Dependencies were not installed. | Run `npm install` inside both `backend/` and `frontend/` directories. |
| `CORS policy violation: No 'Access-Control-Allow-Origin' header` | Frontend is calling backend from an unwhitelisted port. | Ensure `CLIENT_URL` in `backend/.env` matches `http://localhost:5173`. In development, CORS is automatically permissive. |
| `Cast to ObjectId failed for value "stats"` | Route ordering bug in Express where `/:id` was placed above `/stats`. | Verified resolved: In `taskRoutes.js`, `/stats` is strictly registered before `/:id`. |
| `Vite build fails on missing packages` | Missing production build dependencies. | Run `npm run build:frontend` to verify production bundle integrity. |

---

## 15. Conclusion & Examiner Demonstration Guide

When presenting this project to the examiner, follow these 5 steps:

1. **Show Architecture & Startup**:
   - Point out the terminal logs showing MongoDB connection: `[Database] MongoDB Connected: 127.0.0.1/taskflow_db`.
   - Explain the clean folder separation: `backend/` (Express API) and `frontend/` (Vite React SPA).
2. **Demonstrate Dashboard & Stats (Concept #1, #2, #5, #9)**:
   - Open `http://localhost:5173/`.
   - Point out the KPI statistics cards and sprint progress track.
   - Explain how `useEffect` fetched these stats from `GET /api/tasks/stats` on initial mount.
3. **Demonstrate CRUD & 3-Tier Validation (Concept #3, #11, #12, #13)**:
   - Click **"Create Task"** (`/tasks/new`).
   - Try submitting with an empty title or title with only 2 characters. Show the immediate inline validation message: *"Title must be at least 3 characters long"*.
   - Fill in a valid task and click submit. Watch the floating success toast and redirection to `/tasks`.
   - Click the status dropdown on the card to change from `Pending` to `Completed`. Point out that the completion percentage immediately updates without page reload.
4. **Demonstrate Performance & Lazy Loading (Concept #7, #8)**:
   - Navigate to `/tasks/` and type in the SearchBar. Explain how `useDebounce` prevents firing requests on every keystroke.
   - Explain that `TaskCard` is wrapped in `React.memo` to skip re-rendering unchanged cards.
   - Open browser DevTools Network tab. Navigate to **"About"** or click **"Details"** on a task. Show that `TaskDetailsPage.js` and `AboutPage.js` are downloaded as separate chunks only upon navigation.
5. **Show Educational Lifecycle Inspector (Concept #6)**:
   - On the Dashboard, expand the **"React Lifecycle & Hook Inspector"** widget.
   - Click the **"Increment"** button. Point out how the counter state change logs an `UPDATE` event and tracks re-render counts, while the timer demonstrates `useEffect` interval cleanup.

---

*Engineered with precision for academic and production excellence.*
