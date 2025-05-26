import React, {useState} from 'react'
import axios from 'axios'
import './Css/Register.css';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from './config';

function Register() {
    const navigator = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const post = async () => {
        const data = { username, password, email, phone_number };
        console.log('Data being sent:', data);
        try {
            const response = await axios.post(API_ENDPOINTS.REGISTER, data);
            console.log('Registration Successful', response.data);
            alert('Account Created Successfully');
            navigator('/login');
        } catch (error) {
          console.error('Error registering:', error.response ? error.response.data : error.message);
          alert('Account creation failed: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
      }
    }

  return (
    <motion.div className='reg-box'>
      <motion.div id='reg-form'
      
      >
      <motion.h1 id='reg-title'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      
      >Register</motion.h1>
             <motion.input id='reg-username'
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: 'easeInOut' }}
                     whileHover={{ scale: 1.1, duration:0.9 }}
                     
                      onChange={(e) => setUsername(e.target.value)}
                      type='text'
      
      
                     
                     
                     >
                      
                     </motion.input>
              <motion.h1 id='reg-user'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              
              >Username
      
              </motion.h1>
                           <motion.input id='reg-password'
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: 'easeInOut' }}
                     whileHover={{ scale: 1.1, duration:0.9 }}
                     
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
      
      
                     
                     
                     >
                      
                     </motion.input>
              <motion.h1 id='reg-pass'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              
              
              >Password
      
              </motion.h1>
                           <motion.input id='reg-Email'
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: 'easeInOut' }}
                     whileHover={{ scale: 1.1, duration:0.9 }}
                     
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
      
      
                     
                     
                     >
                      
                     </motion.input>
              <motion.h1 id='reg-email'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              
              >Email
      
              </motion.h1>


<motion.button
  id="reg-button"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 1 }}
  transition={{  stiffness: 300 }}
  onClick={post}
>
  Register
</motion.button>
                            <motion.h1 id='reg-or'
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                            >
                              have an account?
              
                            </motion.h1>
                            <motion.button id='reg-or1'
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                    onClick={() => navigator('/login')}

                                    whileHover={{ scale: 1.1, duration:0.9, backgroundColor:' #1C4C3A' , color: 'white'}}
                            >
                              Login
              
                            </motion.button>
                            <motion.div id='reg-photo'
                                  initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                            
                            >

                            </motion.div>

      </motion.div>
    </motion.div>
   
  )

};
export default Register;