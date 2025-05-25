import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import './Css/Home.css';

function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="Background">
      <motion.div
        className="learn-more-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="learn-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to Aurora
        </motion.h1>

        <motion.div
          className="learn-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2>What is Aurora?</h2>
          <p>
            Aurora is your local marketplace platform that connects buyers and sellers in your community. 
            We make buying and selling furniture and home items simple, safe, and social.
          </p>
        </motion.div>

        <motion.div
          className="learn-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2>Our Mission</h2>
          <p>
            To create a trusted community marketplace where people can easily discover, buy, and sell 
            quality furniture and home items while building meaningful connections with their neighbors.
          </p>
        </motion.div>

        <motion.div
          className="learn-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2>Why Choose Aurora?</h2>
          <ul>
            <li>Local Focus: Connect with buyers and sellers in your community</li>
            <li>Easy Listing: List items in seconds with just a photo and price</li>
            <li>100% Free: No hidden fees or charges</li>
          </ul>
        </motion.div>

        <motion.button
          className="get-started-btn"
          onClick={() => navigate('/register')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}

export default LearnMore;
