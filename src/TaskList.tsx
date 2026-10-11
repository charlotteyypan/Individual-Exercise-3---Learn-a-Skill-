import type { Task } from "./App";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onDeadlineChange: (id: number, deadline: string) => void;
}

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onDeadlineChange
}: TaskListProps) {

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        No tasks yet. Add your first task!
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onDeadlineChange={onDeadlineChange}
        />
      ))}
    </div>
  );
}

export default TaskList;