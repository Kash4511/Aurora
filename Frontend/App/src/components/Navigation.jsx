import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navigation() {
  const navigate = useNavigate();

  return (
    <motion.div id="nav"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >   
      <motion.h1 id='A'>Aurora</motion.h1>
      <motion.h1 id='APPS'>APPS</motion.h1>
      <motion.div id='buy'>
        <motion.button id='buy-button' onClick={() => navigate('/dash')}>MarketPlace</motion.button>
      </motion.div>
      <motion.div id='sell'>
        <motion.button id='sell-button' onClick={() => navigate('/sell')}>Sell Product</motion.button>
      </motion.div>
      <motion.div id='List'>
        <motion.button id='List-button' onClick={() => navigate('/product_list')}>My Products</motion.button>
      </motion.div>

      <motion.h1 id='APPS1'>ACCOUNTS</motion.h1>
      <motion.div id='log'>
        <motion.button
          id='log-button'
          onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delete axios.defaults.headers.common['Authorization'];
            navigate('/');
          }}
        >
          Logout
        </motion.button>
      </motion.div>
      <motion.div id='switch'>
        <motion.button
          id='switch-button'
          onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delete axios.defaults.headers.common['Authorization'];
            navigate('/login');
          }}
        >
          Switch User
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Navigation; 