import React from 'react';
import '../Css/topbar.css';

const TopBar = () => {
  return (
    <div
      style={{
        height: '50px',
        width: '100%',
        backgroundColor: '#1F1F1F',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        color: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2001, // Above Navigation
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderBottom: '3px solid #474747',
      }}
    >
      <div className="topbar-logo" />
      <span className="topbar-title">Products</span>
    </div>
  );
};

export default TopBar;
