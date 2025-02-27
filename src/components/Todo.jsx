import React, { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    setTasks((prevTasks) => prevTasks.filter((currElement,i) => i !== index));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">TODO-LIST</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={handleInputChange}
          className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ol className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded-md"
          >
            <span className="text">{task}</span>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  </div>
);
};

export default Todo;
