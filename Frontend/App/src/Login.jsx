import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, axiosConfig } from './config';

function Login() {
  const navigator = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const post = async () => {
    setError('');
    const data = { username, password };
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, data, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        navigator('/dash');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <>
    <motion.div className='login-box'>
      <motion.div
       id='login-form'
      > 
       <motion.h1 
       id='login-title'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}

       >Buy & Sell Furniture Easily


       </motion.h1>
       <motion.h1 
       id='login-title1'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}

       >Login


       </motion.h1>
       {error && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="error-message"
           style={{ color: 'red', marginBottom: '10px' }}
         >
           {error}
         </motion.div>
       )}
       <motion.div>
       <motion.input id='username'
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: 'easeInOut' }}
               whileHover={{ scale: 1.1, duration:0.9 }}
               
                onChange={(e) => setUsername(e.target.value)}
                type='text'


               
               
               >
                
               </motion.input>
        <motion.h1 id='user'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        
        >Username

        </motion.h1>
        </motion.div>


       
       <motion.input id='password'
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: 'easeInOut' }}
               whileHover={{ scale: 1.1, duration:0.9 }}
               
                onChange={(e) => setPassword(e.target.value)}
                type='password'

               
               
               >

               </motion.input>

        <motion.h1 id='pass'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        
        >Password

        </motion.h1>
        <motion.button id='login-button'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, duration: 0.9 }}
        onClick={post}
        >Login
        </motion.button>
        </motion.div>
        <motion.div id='photo'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}>
              <motion.h1 id='or'
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                Dont have an account?

              </motion.h1>
                            <motion.button id='or1'
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                    onClick={() => navigator('/register')}

                                    whileHover={{ scale: 1.1, duration:0.9, backgroundColor:' #1C4C3A' , color: 'white'}}
                            >
                              Register
              
                            </motion.button>


        </motion.div>



       </motion.div>


    


    </>
  );
  
}

export default Login;