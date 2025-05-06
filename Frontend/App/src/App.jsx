import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { motion } from 'framer-motion'; // ✅ Use 'framer-motion', not 'motion/react'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>




    </div>
  );
};

export default App;
