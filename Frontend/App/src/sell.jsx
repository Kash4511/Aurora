import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Css/sell.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken) throw new Error('No refresh token found');

    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    window.location.href = '/login';
  }
}

function Sell() {
  const navigator = useNavigate();
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [socialID, setSocialID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('item_name', itemName);
    formData.append('item_price', itemPrice);
    formData.append('item_description', itemDescription);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('image', image);
    formData.append('phone_number', phoneNumber);
    formData.append('social_ID', socialID);

    try {
      await axios.post('http://127.0.0.1:8000/sell/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product uploaded successfully!');
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) return;
        try {
          await axios.post('http://127.0.0.1:8000/sell/', formData, {
            headers: {
              Authorization: `Bearer ${newToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Product uploaded successfully!');
        } catch (retryError) {
          console.error('Retry failed:', retryError.response?.data || retryError.message);
          alert('Upload failed after retrying.');
        }
      } else {
        console.error('Upload failed:', error.response?.data || error.message);
        alert('Upload failed. Check console for details.');
      }
    }
  };

  return (
    <motion.div className="background">
      {/* Navigation Bar */}
      <motion.div
        id="sell-nav"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          id="sell-buy"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.button
            id="sell-buy-button"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onClick={() => navigator('/dash')}
          >
            Buy
          </motion.button>
        </motion.div>
        <motion.div
          id="sell-sell"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.button
            id="sell-sell-button"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onClick={() => navigator('/sell')}
          >
            Sell
          </motion.button>
        </motion.div>
        <motion.div
          id="sell-set"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.button
            id="sell-set-button"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Settings
          </motion.button>
        </motion.div>
        <motion.div
          id="sell-log"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.button
            id="sell-log-button"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onClick={() => navigator('/')}
          >
            Logout
          </motion.button>

        </motion.div>
      </motion.div>

      {/* Sell Form */}
      <motion.h1
  id="title1"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  Sell Product
</motion.h1>
      
      <motion.form id="form" onSubmit={handleSubmit}>
        <motion.input
          id="sell-item"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <motion.h1 id="sell-name">Item Name</motion.h1>

        <motion.input
          id="sell-item1"
          type="text"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          required
        />
        <motion.h1 id="sell-price">Price</motion.h1>

        <motion.input
          id="sell-item2"
          type="text"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          required
        />
        <motion.h1 id="sell-des">Description</motion.h1>

        <motion.input
          id="sell-item3"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <motion.h1 id="sell-country">Country</motion.h1>

        <motion.input
          id="sell-item4"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <motion.h1 id="sell-state">State</motion.h1>

        <motion.input
          id="sell-item5"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <motion.h1 id="sell-city">City</motion.h1>

        <PhoneInput
          id="sell-phone"
          placeholder="e.g. +966500000000"
          international
          defaultCountry={null}
          countryCallingCodeEditable={true}
          value={phoneNumber}
          onChange={setPhoneNumber}
          required
        />
        <motion.h1 id="sell-phone-label">Phone Number</motion.h1>

        <motion.input
          id="sell-social"
          type="text"
          placeholder="e.g. Instagram ID, Telegram ID"
          value={socialID}
          onChange={(e) => setSocialID(e.target.value)}
          required
        />
        <motion.h1 id="sell-social-label">Social ID</motion.h1>

        <motion.input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <motion.h1 id="sell-image">Image</motion.h1>

        <motion.button id="button-sell" type="submit">
          Sell
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default Sell;