import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './home'; 
import Dash from './dash';
import Sell from './sell';
import ProductDetail from './product';
import ProtectedRoute from './ProtectedRoute'; // ⬅️ Import this

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Wrap protected routes */}
          <Route
            path="/dash"
            element={
              <ProtectedRoute>
                <Dash />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
