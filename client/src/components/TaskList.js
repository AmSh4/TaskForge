import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onShare }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <div key={task._id} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Category: {task.category}</p>
          <p>Due: {task.dueDate}</p>
          <div className="mt-2">
            <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Edit</button>
            <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-2 py-1 mr-2 rounded">Delete</button>
            <button onClick={() => onShare(task._id)} className="bg-green-500 text-white px-2 py-1 rounded">Share</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;