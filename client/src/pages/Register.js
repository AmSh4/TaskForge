import React from 'react';
import AuthForm from '../components/AuthForm';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const token = await register(data);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthForm onSubmit={handleRegister} isRegister={true} />
    </div>
  );
};

export default Register;