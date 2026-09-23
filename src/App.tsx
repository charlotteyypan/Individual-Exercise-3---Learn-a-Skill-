import { useState } from "react";
import TaskList from "./TaskList";
import ProgressBar from "./ProgressBar";
import "./App.css";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {

  const [tasks, setTasks] = useState<Task[]>([
  ]);

  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  function addTask() {
    if (newTask.trim() === "") {
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  }

  return (
    <main className="app">

      <div className="calendar-card">

        <h1>Today's Progress</h1>

        <ProgressBar
          completed={completedTasks}
          total={tasks.length}
        />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        <div className="add-task">

          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={(event) =>
              setNewTask(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>
            Add
          </button>

        </div>

      </div>

    </main>
  );
}

export default App;