import React, { useState, useEffect } from 'react';
import nlp from 'compromise';

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [dueDate, setDueDate] = useState(initialData.dueDate || '');
  const [priority, setPriority] = useState(initialData.priority || 'Medium');
  const [category, setCategory] = useState(initialData.category || 'General');

  useEffect(() => {
    if (description) {
      const doc = nlp(description);
      const terms = doc.terms().out('array');
      // Simple AI logic: detect keywords for priority and category
      if (terms.some(t => ['urgent', 'important', 'now'].includes(t.toLowerCase()))) {
        setPriority('High');
      } else if (terms.some(t => ['later', 'minor'].includes(t.toLowerCase()))) {
        setPriority('Low');
      }
      if (terms.some(t => ['work', 'office'].includes(t.toLowerCase()))) {
        setCategory('Work');
      } else if (terms.some(t => ['home', 'personal'].includes(t.toLowerCase()))) {
        setCategory('Personal');
      }
    }
  }, [description]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, priority, category });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="block w-full mb-4 p-2 border" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="block w-full mb-4 p-2 border" required />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="block w-full mb-4 p-2 border" />
      <select value={priority} onChange={e => setPriority(e.target.value)} className="block w-full mb-4 p-2 border">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select value={category} onChange={e => setCategory(e.target.value)} className="block w-full mb-4 p-2 border">
        <option>General</option>
        <option>Work</option>
        <option>Personal</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Task</button>
    </form>
  );
};

export default TaskForm;