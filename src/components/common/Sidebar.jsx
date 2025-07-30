import React from 'react';
import { NavLink } from 'react-router-dom';
import 'src/components/common/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink></li>
          <li><NavLink to="/clients" activeclassname="active">Clients</NavLink></li>
          <li><NavLink to="/forms" activeclassname="active">Forms</NavLink></li>
          <li><NavLink to="/invoices" activeclassname="active">Invoices</NavLink></li>
          <li><NavLink to="/charts" activeclassname="active">Charts</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
