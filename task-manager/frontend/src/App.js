import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import EditTaskModal from "./components/EditTaskModal";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await createTask(task);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to create task");
    }
  };

    const editTask = async (id, updates) => {
      try {
        const res = await updateTask(id, updates);
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
        setEditingTask(null); // close the modal
      } catch (err) {
        alert(err.response?.data?.error || "Failed to update task");
      }
    };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete task");
    }
  };

  const toggleComplete = async (id) => {
    try {
      const res = await toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to toggle");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="title">Task Manager</h1>
      </header>

      <div className="toolbar">
        <TaskForm onAdd={addTask} />
      </div>

      <div className="filters-row">
        <span className="filters-label">Filter:</span>
        <TaskFilter filter={filter} setFilter={setFilter} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <TaskList
        tasks={filteredTasks}
        onEditRequest={(task) => setEditingTask(task)}
        onDelete={removeTask}
        onToggle={toggleComplete}
        paused={Boolean(editingTask)}
      />

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={(payload) => editTask(editingTask.id, payload)}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
