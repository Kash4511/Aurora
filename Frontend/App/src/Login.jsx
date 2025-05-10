import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigator = useNavigate();
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