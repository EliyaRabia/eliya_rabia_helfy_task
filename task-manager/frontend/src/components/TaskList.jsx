import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onEditRequest,
  onDelete,
  onToggle,
  paused,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (tasks.length === 0) {
      setIndex(0);
      return;
    }
    setIndex((prev) => Math.min(prev, tasks.length - 1));
  }, [tasks.length]);

  useEffect(() => {
    if (tasks.length <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % tasks.length);
    }, 3000);
    return () => clearInterval(id);
  }, [tasks.length, paused]);

  if (tasks.length === 0) return <p>No tasks available</p>;

  const safeIndex = index % tasks.length;
  const task = tasks[safeIndex];
  if (!task) return <p>No tasks available</p>;

  return (
    <div className="carousel">
      <TaskItem
        task={task}
        onEditRequest={onEditRequest}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    </div>
  );
}
