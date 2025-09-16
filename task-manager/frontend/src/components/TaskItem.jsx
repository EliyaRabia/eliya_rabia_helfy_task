import React from "react";

export default function TaskItem({ task, onEditRequest, onDelete, onToggle }) {
  if (!task) return null;

  const priorityClass =
    {
      low: "prio-low",
      medium: "prio-medium",
      high: "prio-high",
    }[task.priority] || "prio-low";

    const createdAtText = new Date(task.createdAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: true,
    });


  return (
    <div className="task-item task-card">
      <div className="top-left-actions">
        <button
          className="btn btn-icon"
          onClick={() => onEditRequest(task)}
          aria-label="Edit task"
          title="Edit"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
              fill="currentColor"
            />
            <path
              d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              fill="currentColor"
            />
          </svg>
        </button>

        <button
          className="btn btn-icon danger"
          onClick={() =>
            window.confirm("Delete this task?") && onDelete(task.id)
          }
          aria-label="Delete task"
          title="Delete"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.59 7.1 5.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.9 4.9a1 1 0 1 0 1.41 1.41L12 13.41l4.9 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.9a1 1 0 0 0-.01-1.4z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="top-right-toggle">
        <label className="switch" title="Toggle completed">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label="Toggle completion"
          />
          <span className="slider" />
        </label>
      </div>

      <h2 className="task-title">{task.title}</h2>
      <p className="task-desc">{task.description}</p>

      <div className="task-row">
        <span className="task-label">Priority:</span>
        <span className={`priority-badge ${priorityClass}`}>
          {task.priority}
        </span>
      </div>

      <div className="status-block">
        <div className="task-row">
          <span className="task-label">Status:</span>
          <span className="status-text">
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <p className="created-at">Created: {createdAtText}</p>
      </div>

    </div>
  );
}
