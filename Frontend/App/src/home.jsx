import React from 'react';
import axios from 'axios';
import './Css/Home.css';
import { motion } from 'motion/react';
function Home() {

    const post = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000');
            console.log('Response:', response.data);
          } catch (error) {
            console.error('Error logging in:', error);
          }
        }
        
  return (
    <div className="Background">
 

  {/* Navigation / Header */}
  <motion.div className="navbar">
    <motion.h1
      id="Aurora"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      Aurora
    </motion.h1>

    <motion.h1
      id="Home"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      Home
    </motion.h1>

    <motion.h1
      id="About"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      About
    </motion.h1>

    <motion.h1
      id="Contact"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      Contact
    </motion.h1>

    <motion.button
      id="Login"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onClick={post}
      whileHover={{
        scale: 1.1,
        color: '#fff',
        backgroundColor: '#222121',
        transition: { duration: 0.1 }
      }}
      whileTap={{
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
    >
      Login
    </motion.button>
  </motion.div>
   {/* Photo section - slides in from right */}
   <motion.div
    className="photo"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut' }}
  />

  {/* Slogan or Main Heading */}
  <motion.div className="slogan">
  <motion.h1
    id="simple"
    initial={{ opacity: 0, y: 50 }}  // Starts invisible and 50px down
    animate={{ opacity: 1, y: 0 }}   // Ends visible and at normal position
    transition={{ 
      duration: 0.9, 
      ease: 'easeOut',
      delay: 0.3     // Optional: Add slight delay for staggered animations
    }}
  >
    Selling made
  </motion.h1>
    <motion.h1
        id="simple2"
        initial={{ opacity: 0, y: 50 }}  // Starts invisible and 50px down
        animate={{ opacity: 1, y: 0 }}   // Ends visible and at normal position
        transition={{ 
        duration: 0.9, 
        ease: 'easeOut',
        delay: 0.3     // Optional: Add slight delay for staggered animations
        }}
    >
        Simple
    </motion.h1>
    <motion.h1
    id="Better"
    initial={{ opacity: 0, y: 50 }}  // Starts invisible and 50px down
    animate={{ opacity: 1, y: 0 }}   // Ends visible and at normal position
    transition={{ 
      duration: 0.9, 
      ease: 'easeOut',
      delay: 0.3     // Optional: Add slight delay for staggered animations
    }}
  >
    Buying made
  </motion.h1>
    <motion.h1
        id="Better2"
        initial={{ opacity: 0, y: 50 }}  // Starts invisible and 50px down
        animate={{ opacity: 1, y: 0 }}   // Ends visible and at normal position
        transition={{ 
        duration: 0.9, 
        ease: 'easeOut',
        delay: 0.3     // Optional: Add slight delay for staggered animations
        }}
    >
        Better
    </motion.h1>
    <motion.h1
        id="dis"
        initial={{ opacity: 0, y: 50 }}  // Starts invisible and 50px down
        animate={{ opacity: 1, y: 0 }}   // Ends visible and at normal position
        transition={{ 
        duration: 0.9, 
        ease: 'easeOut',
        delay: 0.3     // Optional: Add slight delay for staggered animations
        }}
    >
        Buy, sell, and trade with your community—hassle-free. Discover hidden gems near you or list items in seconds. Safe, social, and 100% free.
    </motion.h1>
    <motion.button
      id="Singup"
      initial={{ opacity: 0, y: 50 }}  // Starts invisible and 50px down
        animate={{ opacity: 1, y: 0 }}   // Ends visible and at normal position
        transition={{ 
        duration: 0.9, 
        ease: 'easeOut',
        delay: 0.3     // Optional: Add slight delay for staggered animations
        }}
      onClick={post}
      whileHover={{
        scale: 1.1,
        color: '#fff',
        backgroundColor: '#222121',
        transition: { duration: 0.1 }
      }}
      whileTap={{
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
    >
      Sign Up
    </motion.button>
    <motion.button
      id="Learn"
      initial={{ opacity: 0, y: 50 }}  // Starts invisible and 50px down
        animate={{ opacity: 1, y: 0 }}   // Ends visible and at normal position
        transition={{ 
        duration: 0.9, 
        ease: 'easeOut',
        delay: 0.3     // Optional: Add slight delay for staggered animations
        }}
      onClick={post}
      whileHover={{
        scale: 1.1,
        color: '#1F1F1F',
        backgroundColor: '#F3E1C0',
        transition: { duration: 0.1 }
      }}
      whileTap={{
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
    >
      Learn More
    </motion.button>
    </motion.div>
    <motion.div
  className="fea"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.3 }} // Optional config
>
  <motion.div
    id="stop"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.h1
      id="stop2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      List an Item in Seconds
    </motion.h1>

    <motion.h1
      id="stop3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Snap a photo, Set your price and you’re live
    </motion.h1>
    <motion.button
    id='stop4'
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{
      scale: 1.1,
      color: '#fff',
      backgroundColor: '#222121',
      transition: { duration: 0.1 }
    }}
    whileTap={{
      scale: 0.9,
      transition: { duration: 0.1 }
    }}

    
    >Start Selling

    </motion.button>
  </motion.div>
  <motion.div
  className="fea1"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.3 }} // Optional config
>
  <motion.div
    id="loc"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.h1
      id="loc2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Discover 
      Local finds
    </motion.h1>

    <motion.h1
      id="loc3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Explore Unique Items near you today
    </motion.h1>
    <motion.button
    id='loc4'
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{
      scale: 1.1,
      color: '#1F1F1F',
      backgroundColor: '#F3E1C0',
      transition: { duration: 0.1 }
    }}
    whileTap={{
      scale: 0.9,
      transition: { duration: 0.1 }
    }}

    
    >Browse Listing

    </motion.button>
  </motion.div>
</motion.div>
</motion.div>
<motion.div
  className="fea2"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.3 }} // Optional config
>
  <motion.div
    id="bell"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.h1
      id="bell2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Stay 
      Updated
    </motion.h1>

    <motion.h1
      id="bell3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Get alerts when someone saves, likes, or views your listing.
    </motion.h1>
    <motion.button
    id='bell4'
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{
      scale: 1.1,
      color: '#1F1F1F',
      backgroundColor: '#F3E1C0',
      transition: { duration: 0.1 }
    }}
    whileTap={{
      scale: 0.9,
      transition: { duration: 0.1 }
    }}

    
    >Get Updates

    </motion.button>
  </motion.div>
</motion.div>
  <motion.div className='line'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}

  
  >
    <motion.h1
      id="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    
    >Aurora

    </motion.h1>
    <motion.h1
      id="footer1"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    
    >discover, list, connect 

    </motion.h1>
    <motion.h1
      id="footer2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    
    >Home     

    </motion.h1>
    <motion.h1
      id="footer3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    
    >About  

    </motion.h1>
    <motion.h1
      id="footer4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    
    >Contact 

    </motion.h1>
    <motion.h1
      id="footer5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    
    >@2025 Aurora 

    </motion.h1>
    <motion.h1
      id="footer6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    
    >Made by Kaashif Ameen

    </motion.h1>


  </motion.div>

</div>


  );

}

export default Home;