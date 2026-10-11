import { useState } from "react";
import TaskList from "./TaskList";
import ProgressBar from "./ProgressBar";
import "./App.css";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  deadline?: string;
}

const calendarColors = [
  { name: "White", value: "#ffffff" },
  { name: "Blue", value: "#bad3ff" },
  { name: "Green", value: "#99ffb9" },
  { name: "Pink", value: "#ffc0cb" },
  { name: "Red", value: "#ff7383" },
  { name: "Gray", value: "#262626" },
];

function App() {

  const [tasks, setTasks] = useState<Task[]>([
  ]);

  const [newTask, setNewTask] = useState("");

  const [calendarColor, setCalendarColor] = useState("#ffffff")

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

  function handleDeadlineChange(id: number, deadline: string){
    setTasks(
      tasks.map((task) => 
        task.id == id
          ? {...task, deadline}
          : task
      )
    )
  }

  function deleteTask(id: number) {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  }

  return (
    <main className="app">

      <div className="calendar-card"
          style={{backgroundColor: calendarColor}}>

        <h1>Today's Progress</h1>
        
        <div className="color-picker">
          <label htmlFor="calendar-color">
            Calendar color:
          </label>
          <select
            id="calendar-color"
            value={calendarColor}
            onChange={(event)=>setCalendarColor(event.target.value)}
          >
            {calendarColors.map((color)=>(
              <option key={color.value} value={color.value}>{color.name}
              </option>))}
          </select>
        </div>

        <ProgressBar
          completed={completedTasks}
          total={tasks.length}
        />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onDeadlineChange={handleDeadlineChange}
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