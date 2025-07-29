import React from 'react';
import Header from './src/components/common/Header';
import Sidebar from './src/components/common/Sidebar';
import './src/components/common/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
