import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './src/context/AppContext';
import './src/component/auth/LoginForm.css';

const LoginForm = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: 'Test User' });
    navigate('/dashboard');
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
