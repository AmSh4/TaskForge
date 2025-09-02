import React from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const token = await login(data);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;