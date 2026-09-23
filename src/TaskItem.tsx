import React from 'react';

import type { Task } from "./App";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({
  task,
  onToggle,
  onDelete
}: TaskItemProps) {

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>

      <button
        className="complete-button"
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? "✓" : "○"}
      </button>

      <span className="task-title">
        {task.title}
      </span>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
      >
        🗑
      </button>

    </div>
  );
}

export default TaskItem;