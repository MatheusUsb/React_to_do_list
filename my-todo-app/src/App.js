import React, { useState, useEffect } from 'react';
import './App.css';

const loadInitialTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [
    { id: 1, text: 'Learn React', completed: false, dueDate: '' },
    { id: 2, text: 'Grocery shopping', completed: true, dueDate: '' },
  ];
};

function App() {
  const [tasks, setTasks] = useState(loadInitialTasks);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text, completed: false, dueDate };
    setTasks([...tasks, newTask]);
    setText('');
    setDueDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <form onSubmit={addTask} className="add-task-form">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add new task" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} />
            <span>{task.text}</span> <span>{task.dueDate}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;