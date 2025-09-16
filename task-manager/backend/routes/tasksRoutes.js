const express = require("express");
const {
  validateCreateTask,
  validateUpdateTask,
  parseIdParam,
} = require("../middleware/validateTask");

const router = express.Router();

// In-memory storage
let tasks = [
  {
    id: 1,
    title: "Buy milk",
    description: "2% milk",
    completed: false,
    createdAt: new Date(),
    priority: "high",
  },
  {
    id: 2,
    title: "Go to the GYM",
    description: "Today i will do leg Day",
    completed: false,
    createdAt: new Date(),
    priority: "medium",
  },
];
let nextId = 3;

// Helpers
const findIndexById = (id) => tasks.findIndex((t) => t.id === id);

// GET /api/tasks - Get all tasks
router.get("/", (_req, res) => {
  res.json(tasks);
});

// POST /api/tasks - Create a new task
router.post("/", validateCreateTask, (req, res) => {
  const { title, description, completed, priority } = req.body;

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    completed: Boolean(completed),
    createdAt: new Date(),
    priority,
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update a task
router.put("/:id", parseIdParam, validateUpdateTask, (req, res) => {
  const id = req.id;
  const idx = findIndexById(id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  const { title, description, completed, priority } = req.body;

  const updated = {
    ...tasks[idx],
    title: title.trim(),
    description: description.trim(),
    completed: Boolean(completed),
    priority,
  };

  tasks[idx] = updated;
  return res.json(updated);
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", parseIdParam, (req, res) => {
  const id = req.id;
  const idx = findIndexById(id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });
  
  const [removed] = tasks.splice(idx, 1);
  return res.json(removed);
});

// PATCH /api/tasks/:id/toggle - Toggle completion
router.patch("/:id/toggle", parseIdParam, (req, res) => {
  const id = req.id;
  const idx = findIndexById(id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  tasks[idx].completed = !tasks[idx].completed;
  return res.json(tasks[idx]);
});

module.exports = router;
