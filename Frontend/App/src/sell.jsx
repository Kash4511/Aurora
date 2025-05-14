import React, { useState } from 'react';
import axios from 'axios';
import {motion} from 'motion/react';
import './Css/sell.css';

async function refreshAccessToken() {
  // Implement token refresh logic here
  console.log('Refreshing access token...');
  return 'newAccessToken'; // Replace with actual token refresh logic
}

function Sell() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');
    if (!token) {
        token = await refreshAccessToken(); // Refresh the token if it's missing or expired
    }

    const formData = new FormData();
    formData.append('item_name', itemName);
    formData.append('item_price', itemPrice);
    formData.append('item_description', itemDescription);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('image', image);

    console.log('FormData:', [...formData.entries()]); // Debugging

    try {
        const response = await axios.post('http://127.0.0.1:8000/sell/', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Product uploaded:', response.data);
        alert('Product uploaded successfully!');
    } catch (error) {
        console.error('Error uploading product:', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
            alert('Unauthorized! Please log in again.');
            window.location.href = '/login'; // Redirect to login page
        } else {
            alert('Upload failed. Check console for details.');
        }
    }
  };

  return (
    <motion.div className='background'>
      <motion.form 
      id = 'form'
      onSubmit={handleSubmit}
      
      >
        <motion.h1 id='title'
        
        >Sell Product

        </motion.h1>
        <motion.input id='sell-item'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, duration:0.9 }}
          onChange={(e) => setItemName(e.target.value)}
          type='text'
          required
          >
                              
          </motion.input>
          <motion.h1 id='sell-name'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}   
          >Item Name
              
         </motion.h1>
                 <motion.input id='sell-item1'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, duration:0.9 }}
          onChange={(e) => setItemPrice(e.target.value)}
          type='text'
          required
          >
                              
          </motion.input>
          <motion.h1 id='sell-price'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}   
          >Price
              
         </motion.h1>
                       <motion.input id='sell-item2'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, duration:0.9 }}
          onChange={(e) => setItemDescription(e.target.value)}
          type='text'
          required
          >
                              
          </motion.input>
          <motion.h1 id='sell-des'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}   
          >Description
              
         </motion.h1>
                              <motion.input id='sell-item3'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, duration:0.9 }}
          onChange={(e) => setCountry(e.target.value)}
          type='text'
          required
          >
                              
          </motion.input>
          <motion.h1 id='sell-country'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}   
          >Country
              
         </motion.h1>
                                       <motion.input id='sell-item4'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, duration:0.9 }}
          onChange={(e) => setState(e.target.value)}
          type='text'
          >
                              
          </motion.input>
          <motion.h1 id='sell-state'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}   
          >State
              
         </motion.h1>
         <motion.input id='sell-item5'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, duration:0.9 }}
          onChange={(e) => setCity(e.target.value)}
          type='text'
          required
          >
                              
          </motion.input>
          <motion.h1 id='sell-City'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}   
          >City
              
         </motion.h1>
         <motion.input
         id='image'
           type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
         
         >


         </motion.input>
                   <motion.h1 id='sell-image'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}   
          >Image
              
         </motion.h1>
         <motion.button
         id='button-sell'
         type='submit'
         >Sell

         </motion.button>

      </motion.form>
      <motion.div id='search-bar'
      
      >

      </motion.div>
     {/* <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
      <input type="number" placeholder="Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
      <textarea placeholder="Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
      <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
      <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
       <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
       <button type="submit">Sell</button>
     </form> */}
     </motion.div>
  );
}

export default Sell;
