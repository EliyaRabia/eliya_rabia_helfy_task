# Task Manager App
<hr>

## Overview
This project is a Task Manager web application built with React & Node.js. <br>
It allows users to create, edit, delete, and filter tasks by status.<br>
The UI includes a carousel-style task card view, a modal form for editing tasks, and an iOS-like toggle switch for marking tasks as completed.<br>
Styling was implemented with custom CSS, including responsive layouts, filter buttons, and SVG-based icons for actions.

<hr>
## Backend Setup
1. cd backend
2. npm install
3. npm start(runs on port 4000)
<hr>

## Frontend Setup
1. cd frontend
2. npm install
3. npm start(runs on port 3000)
<hr>

## API Endpoints
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle
<hr>

## Design Decisions
The carousel is designed to automatically rotate every 3 seconds, cycling through tasks in an infinite loop.<br>
This ensures that tasks are continuously visible in a smooth and circular flow.<br>
In addition, there are filter options that let the user display tasks by their status (All, Completed, or Pending).<br>
For editing, a dedicated popup modal is provided, allowing tasks to be updated easily without leaving the carousel view.

<hr>

## Time spent
- Backend: 80 minutes
- Frontend: 100 minutes
- Styling: 40 minutes
- Testing: 20 minutes