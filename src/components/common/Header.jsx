import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'src/context/AppContext';
import 'src/component/common/Header.css';

const Header = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <h1>Digital CA Platform</h1>
      <div className="header-right">
        {user && <span>Welcome, {user.name}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
