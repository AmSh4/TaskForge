import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 mx-auto">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block w-full mb-4 p-2 border" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="block w-full mb-4 p-2 border" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;