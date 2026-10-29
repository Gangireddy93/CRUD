<<<<<<< HEAD
# React + Tailwind CSS CRUD Application

A modern, production-ready **CRUD (Create, Read, Update, Delete)** application built with **React 19**, **Tailwind CSS v4**, **Axios**, and **JSON-Server** (with automatic LocalStorage fallback).

Inspired by the YouTube tutorial [CRUD Operation using React - Khanam Coding](https://www.youtube.com/watch?v=qAQ6c1L23-0), enhanced with modern dashboard features, responsive layouts, search & filtering, and dual view modes (Table & Card Grid).

---

## ✨ Features

- **Full CRUD Operations**:
  - **Create**: Add new team members with form validation (Name, Email, Phone, Role, Department, Status, Custom Avatar).
  - **Read**: Browse records in a responsive table or card grid, with click-to-view user profile modal.
  - **Update**: Edit existing employee profiles with pre-filled inputs and instant state synchronization.
  - **Delete**: Remove records with a confirmation modal and visual feedback.
- **Modern UI & Tailwind CSS**:
  - Clean card metrics (Total Users, Active, Pending, Inactive).
  - Status badges (Active, Pending, Inactive) & Department tags.
  - Table View and Card Grid View toggle.
- **Search, Filter & Sort**:
  - Real-time instant search across names, emails, and roles.
  - Status filter dropdown (`All`, `Active`, `Pending`, `Inactive`).
  - Department filter dropdown (`Engineering`, `Design`, `Product`, `Marketing`, `QA`).
  - Sort ascending/descending by creation date, name, or department.
- **Robust API & Fallback**:
  - Communicates with `json-server` REST API via `axios`.
  - Seamless automatic fallback to `localStorage` if JSON-Server is offline, so the app always works out of the box!
- **Feedback & Notifications**:
  - Animated toast notifications on Create, Update, and Delete.
  - Form validation with inline error hints.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application

#### Option A: Run Full Stack (Frontend + JSON Server API) — Recommended
Runs both the mock REST API server on port 5000 and the Vite development server concurrently:
```bash
npm run dev:all
```
- Frontend: `http://localhost:5173`
- REST API: `http://localhost:5001/users`

#### Option B: Run Frontend Only (with LocalStorage fallback)
```bash
npm run dev
```

#### Option C: Run JSON Server Alone
```bash
npm run server
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```
CRUD/
├── db.json                     # Mock database for json-server
├── package.json                # Project dependencies and run scripts
├── vite.config.js              # Vite configuration with Tailwind CSS plugin
├── src/
│   ├── api/
│   │   └── api.js              # Axios REST API service + LocalStorage fallback
│   ├── components/
│   │   ├── Navbar.jsx          # Header with branding & server status indicator
│   │   ├── StatsOverview.jsx   # Metrics overview cards
│   │   ├── UserTable.jsx       # Responsive table view with action buttons
│   │   ├── UserCardGrid.jsx    # Card grid view
│   │   ├── UserModal.jsx       # Create & Edit form modal with validation
│   │   ├── UserDetailModal.jsx # Read single user profile modal
│   │   ├── DeleteConfirmModal.jsx # Confirmation dialog for safe deletion
│   │   ├── Toast.jsx           # Success and error notifications
│   │   └── EmptyState.jsx      # Placeholder when no records or matches found
│   ├── App.jsx                 # Main layout, search, filter, and state orchestration
│   ├── index.css               # Tailwind CSS v4 setup
│   └── main.jsx                # Application root mount
```

---

## 🛠️ Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Axios**
- **JSON-Server**
- **Lucide React** (Modern feather icons)
- **Concurrently**
=======
# CRUD
ReactJS concept daily Practice.
>>>>>>> 4ee8632f16ddb48e5d1946c4d40e857662ae0929
