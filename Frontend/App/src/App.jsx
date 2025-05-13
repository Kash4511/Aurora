import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './home'; 
import Dash from './dash';
import Sell from './sell';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/dash' element={<Dash/>} />
          <Route path='/sell' element={<Sell/>} />
        
        </Routes>
      </Router>




    </div>
  );
};

export default App;
