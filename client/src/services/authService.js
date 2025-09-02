import axios from 'axios';

export const register = async (data) => {
  const res = await axios.post('/api/auth/register', data);
  return res.data.token;
};

export const login = async (data) => {
  const res = await axios.post('/api/auth/login', data);
  return res.data.token;
};