import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { text: inputValue, isEditing: false }]);
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const toggleEdit = (index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, isEditing: !task.isEditing };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleEditChange = (event, index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, text: event.target.value };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const saveEdit = (index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, isEditing: false };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.isEditing ? (
              <input
                type="text"
                value={task.text}
                onChange={(event) => handleEditChange(event, index)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            {task.isEditing ? (
              <button onClick={() => saveEdit(index)}>Save</button>
            ) : (
              <button onClick={() => toggleEdit(index)}>Edit</button>
            )}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
