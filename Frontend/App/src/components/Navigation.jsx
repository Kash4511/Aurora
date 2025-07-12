import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/dash.css'; // Make sure this includes updated styles below

const navItems = [
  { id: 'buy', label: 'Marketplace', route: '/dash' },
  { id: 'sell', label: 'Sell Product', route: '/sell' },
  { id: 'List', label: 'My Products', route: '/product_list' },
  { id: 'chat', label: 'Chatroom', route: '/chatroom' },
  { id: 'switch', label: 'Change User', action: 'switch' },
  { id: 'log', label: 'Logout', action: 'logout' },
  { id: 'setting', label: 'Settings', route: '/settings' },
];

function Navigation() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.route) {
      navigate(item.route);
    } else if (item.action === 'logout' || item.action === 'switch') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];
      navigate(item.action === 'logout' ? '/' : '/login');
    }
  };

  return (
    <motion.div
      id="nav"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        width: isExpanded ? 200 : 50,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isExpanded ? 'flex-start' : 'center',
        paddingTop: '16px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        background: '#1F1F1F',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Logo */}
      <div id="logo" />

      {/* Nav Items */}
      {navItems.map((item) => (
        <motion.div
          key={item.id}
          className="nav-item"
          onClick={() => handleClick(item)}
          whileHover={{ backgroundColor: '#333' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '12px 16px',
            width: '100%',
            borderRadius: '8px',
            margin: '4px 0',
          }}
        >
          <div className="icon" id={item.id} />
          {isExpanded && (
            <span
              className="nav-label"
              style={{
                marginLeft: item.id === 'buy' ? 40 : 40,
                marginTop: item.id === 'buy' ? 40: -3,
                color: '#fff',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Navigation;
