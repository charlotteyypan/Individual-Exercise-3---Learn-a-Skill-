import React from 'react';

import type { Task } from "./App";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onDeadlineChange: (id: number, deadline: string) => void;
}

function TaskItem({
  task,
  onToggle,
  onDelete,
  onDeadlineChange
}: TaskItemProps) {
  const now = new Date();

  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const isOverdue = !!task.deadline && (task.deadline < today) && !task.completed; 

  return (
    <div className={`task-item ${task.completed ? "completed" : ""} 
                  ${isOverdue ? "overdue-text" : ""}`}>

      <button
        className="complete-button"
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? "✓" : "○"}
      </button>

    <div className="task-details">
      <span className="task-title">
        {task.title}
      </span>
      
      {task.deadline && (
        <div className= {`task-deadline ${isOverdue ? "overdue-text ": ""}`}>
          {isOverdue ? "Overdue: ": "Due: "}
          {task.deadline}
        </div>
      )}
    </div>

    <input
        className="deadline-input"
        type="date"
        value={task.deadline ?? ""}
        onChange={(event) =>
          onDeadlineChange(task.id, event.target.value)}
        aria-label={`Deadline for ${task.title}`}
        title="Set deadline date"
      />

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