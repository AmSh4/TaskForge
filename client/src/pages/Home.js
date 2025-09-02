import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import { getTasks, createTask, updateTask, deleteTask, shareTask } from '../services/taskService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const [sharingTaskId, setSharingTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (taskData) => {
    try {
      if (currentTask) {
        await updateTask(currentTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      fetchTasks();
      setIsModalOpen(false);
      setCurrentTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = (id) => {
    setSharingTaskId(id);
  };

  const submitShare = async () => {
    try {
      await shareTask(sharingTaskId, shareEmail);
      setSharingTaskId(null);
      setShareEmail('');
      alert('Task shared!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add Task</button>
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onShare={handleShare} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onSubmit={handleSubmit} initialData={currentTask || {}} />
      </Modal>
      {sharingTaskId && (
        <Modal isOpen={true} onClose={() => setSharingTaskId(null)}>
          <input type="email" value={shareEmail} onChange={e => setShareEmail(e.target.value)} placeholder="Share with email" className="block w-full mb-4 p-2 border" />
          <button onClick={submitShare} className="bg-blue-500 text-white px-4 py-2 rounded">Share</button>
        </Modal>
      )}
    </div>
  );
};

export default Home;