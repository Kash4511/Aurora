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
      
      <motion.div id='buy' onClick={() => navigate('/dash')}>
      </motion.div>
      <motion.div id='nav-line'>
      </motion.div>
      <motion.div id='setting' onClick={() => navigate('/dash')}>
      </motion.div>
      <motion.div id='logo' onClick={() => navigate('/dash')}>
      </motion.div>
      <motion.div id='chat' onClick={() => navigate('/dash')}>
      </motion.div>
      <motion.div id='sell'onClick={() => navigate('/sell')}>
      </motion.div>
      <motion.div id='List'onClick={() => navigate('/product_list')}>
      </motion.div>

      <motion.div id='log'
                onClick={() => {
                  localStorage.removeItem('access_token');
                  localStorage.removeItem('refresh_token');
                  delete axios.defaults.headers.common['Authorization'];
                  navigate('/');
                }}>

      </motion.div>
      <motion.div id='switch'
                onClick={() => {
                  localStorage.removeItem('access_token');
                  localStorage.removeItem('refresh_token');
                  delete axios.defaults.headers.common['Authorization'];
                  navigate('/login');
                }}>
      
      </motion.div>
    </motion.div>
  );
}

export default Navigation; 