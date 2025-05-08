import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const post = async () => {
    const data = { username, password };
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', data);
      console.log('Login Successful', response.data);
      alert('Login Successful');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login Failed');
    }
  };

  return (
    <>
    

        <h1 
        id="name"
        
        >Login</h1>
        <div
          id="photo"
          
        >

        </div>
    
        <motion.div>
          <motion.input
            id="user"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, color: '#ffff', backgroundColor: '#222121' }}
            whileTap={{ scale: 1 }}
            style={{
              fontFamily: "'Poppins', sans-serif", // Apply Poppins font
              fontSize: "1.4rem", // Adjust placeholder size (e.g., 1.2rem = ~19px)
              padding: "10px 15px", // Optional: Add padding for better appearance
            }}
          />
        </motion.div>
    
        <motion.div>
            <motion.input
                  id="pass"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  whileHover={{  scale: 1.05}}
                  whileTap={{ scale: 1 }}
                  style={{
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: "1.4rem", 
                    padding: "10px 15px", 

                  }}
                />
        </motion.div>
    
        <motion.button
          id="button"
          onClick={post}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          whileHover={{ 
            scale: 1.05, 
           
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.4rem",
            padding: "10px 15px",
          
            borderRadius: "50px", // Match border radius
            cursor: "pointer", // Add pointer cursor
          }}
        >
          Login
        </motion.button>

    </>
  );
  
}

export default Login;