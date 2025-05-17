import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {backOut, motion} from 'motion/react';
import './Css/dash.css';
import { useNavigate } from 'react-router-dom';
function Dash() {
    const navigator = useNavigate();
    const [data, setData] = useState([]); // Define the state for storing fetched data

    const get = async () => {
        try {
            const token = localStorage.getItem('token'); // or sessionStorage
            const response = await axios.get('http://127.0.0.1:8000/dash/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data); // Log the fetched data
            setData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        get(); // Fetch data when the component is mounted
    }, []);

    return (
        <div style={{ display: 'flex' }}>
  {/* ✅ Left Sidebar / Nav */}
  <motion.div
    id="nav"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}

  >
    <motion.div
    id='buy'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}    
    >
        <motion.button
        id='buy-button'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }} 
        onClick={() => navigator('/dash')} 

        >Buy
        

        </motion.button>

    </motion.div>
        <motion.div
    id='sell'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}    
    >        <motion.button
        id='sell-button'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}  
        onClick={() => navigator('/sell')} 

        >Sell
        

        </motion.button>

    </motion.div>
        <motion.div
    id='set'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}    
    >
             <motion.button
        id='set-button'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}  

        >Settings
        

        </motion.button>

    </motion.div>
            <motion.div
    id='log'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}    
    >
             <motion.button
        id='log-button'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onClick={() =>navigator('/')}  

        >Logout
        

        </motion.button>

    </motion.div>
    <motion.div
    id='title'
           initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
    
    >
        <motion.h1
        id='A'
           initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        
        >Aurora

        </motion.h1>

    </motion.div>

  </motion.div>

  {/* ✅ Main Content */}
  <div style={{ flex: 1 }}>
    {/* Cards Section */}
    <motion.div 
      className='cards-wrapper'
      style={{
        maxWidth: '1200px',
        margin: '150px auto 0 auto',
        padding: '0 40px',
        boxSizing: 'border-box',
      }}
    >
      <motion.div 
        className='cards'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0px',
          marginRight: '100px',
          marginLeft: '-70px',
          
         
        }}
      >
        {data.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
            //   border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              backgroundColor: '#fff',
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.item_name}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  marginTop: '10px',
                  cursor: 'pointer',
                  padding: '10px',
                  
                  transition: 'background-color 0.3s ease',
                }}
                 onClick={() => navigator(`/product/${item.id}`)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#f0f0f0',
                }}

              />
            )}
            <motion.div
            id ='item'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
             
              onClick={() => navigator(`/product/${item.id}`)}
  whileHover={{
    scale: 1.05,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f0f0f0',
  }}
  style={{
    marginTop: '10px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '10px',
    transition: 'background-color 0.3s ease',
  }}
            >
              <strong>{item.item_name}</strong> - <strong>{item.item_price}</strong> <br />
              {item.item_description}<br />
              <thin>({item.city}, {item.state}, {item.country})</thin> <br />
              ({item.phone_number}, {item.social_ID}) <br />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>


  </div>
</div>








    );
}

export default Dash;
