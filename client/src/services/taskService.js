import axios from 'axios';

const API = axios.create({
  baseURL: '/api/tasks',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getTasks = async () => {
  const res = await API.get('/');
  return res.data;
};

export const createTask = async (data) => {
  const res = await API.post('/', data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};

export const shareTask = async (id, email) => {
  const res = await API.post(`/${id}/share`, { email });
  return res.data;
};