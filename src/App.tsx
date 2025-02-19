import React, { useState, useEffect } from "react";
import CartoonList from "./components/CartoonList"; // ייבוא קומפוננטת הדמויות
import "./App.css";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskFilter, setTaskFilter] = useState("all");

  // 📌 טעינת משימות מ-localStorage בעת טעינת הדף
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      console.log("🔍Data loaded -localStorage:", JSON.parse(storedTasks));
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // 📌 שמירת משימות ב-localStorage בכל שינוי
  useEffect(() => {
    if (tasks.length > 0) {
      console.log("💾save tasks - localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // 📌 הוספת משימה
  const addTask = () => {
    if (taskTitle.trim() === "") return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
    };

    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // שמירה מיידית
      return updatedTasks;
    });

    setTaskTitle("");
    setTaskDescription("");
  };

  // 📌 שינוי סטטוס משימה
  const toggleTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // עדכון מיידי
      return updatedTasks;
    });
  };

  // 📌 מחיקת משימה
  const deleteTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // עדכון מיידי
      return updatedTasks;
    });
  };

  // 📌 סינון משימות
  const filteredTasks = tasks.filter(task => {
    if (taskFilter === "completed") return task.completed;
    if (taskFilter === "not-completed") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task List ✅</h1>

      {/* 📌 הוספת משימה */}
      <div className="task-input">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task name..."
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task description (optional)..."
        />
        <button onClick={addTask}>➕ add Task</button>
      </div>

      {/* 📌 כפתורי סינון */}
      <div className="task-filters">
        <button onClick={() => setTaskFilter("all")}>📋 All Tasks</button>
        <button onClick={() => setTaskFilter("completed")}>✅ Completed</button>
        <button onClick={() => setTaskFilter("not-completed")}>❌ Not completed</button>
      </div>

      {/* 📌 טבלה להצגת משימות */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Task name:</th>
            <th>Description:</th>
            <th>Status: </th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={4}>🔍No Tasks</td>
            </tr>
          ) : (
            filteredTasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description || "No description"}</td>
                <td>{task.completed ? "✅ completed" : "❌ Not completed"}</td>
                <td>
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? "↩ not completed" : "✔ Mark as complete"}
                  </button>
                  <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 📌 קריאה לקומפוננטת `CartoonList` – יוצג בסוף הדף */}
      <CartoonList />
    </div>
  );
};

export default App;
