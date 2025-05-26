import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Css/sell.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from './components/Navigation';

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token found');

    const response = await axios.post(API_ENDPOINTS.SELL, {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    window.location.href = '/login';
  }
}

function Sell() {
  const navigator = useNavigate();
  const { productId } = useParams();
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [socialID, setSocialID] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Please login to continue');
        navigator('/login');
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/products/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.data) {
        throw new Error('No product data received');
      }

      const product = response.data;
      setItemName(product.item_name || '');
      setItemPrice(product.item_price || '');
      setItemDescription(product.item_description || '');
      setCountry(product.country || '');
      setState(product.state || '');
      setCity(product.city || '');
      setPhoneNumber(product.phone_number || '');
      setSocialID(product.social_ID || '');
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      if (error.response?.status === 401) {
        alert('Your session has expired. Please login again.');
        navigator('/login');
      } else if (error.response?.status === 404) {
        alert('Product not found');
        navigator('/product_list');
      } else {
        alert('Error loading product details. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('item_name', itemName);
    formData.append('item_price', itemPrice);
    formData.append('item_description', itemDescription);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('phone_number', phoneNumber);
    formData.append('social_ID', socialID);

    // Only append image if it's a new file or a new product
    if (image) {
      formData.append('image', image);
    } else if (!isEditing) {
      alert('Please select an image for your product');
      return;
    }

    try {
      if (isEditing) {
        // For editing, use PATCH instead of PUT to only update provided fields
        await axios.patch(`http://127.0.0.1:8000/products/${productId}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product updated successfully!');
      } else {
        await axios.post('http://127.0.0.1:8000/sell/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product uploaded successfully!');
      }
      navigator('/product_list');
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) return;
        try {
          if (isEditing) {
            await axios.patch(`http://127.0.0.1:8000/products/${productId}/`, formData, {
              headers: {
                Authorization: `Bearer ${newToken}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            alert('Product updated successfully!');
          } else {
            await axios.post('http://127.0.0.1:8000/sell/', formData, {
              headers: {
                Authorization: `Bearer ${newToken}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            alert('Product uploaded successfully!');
          }
          navigator('/product_list');
        } catch (retryError) {
          console.error('Retry failed:', retryError.response?.data || retryError.message);
          alert('Operation failed after retrying.');
        }
      } else {
        console.error('Operation failed:', error.response?.data || error.message);
        alert('Failed due to wrong input please check the details again (Price should not have commas');
      }
    }
  };

  return (
    <motion.div className="background">
      <Navigation />

      {/* Sell Form */}
      <motion.h1
        id="title1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {isEditing ? 'Edit Product' : 'Sell Product'}
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
          required={!isEditing}
        />
        <motion.h1 id="sell-image">Image {isEditing && '(Optional)'}</motion.h1>

        <motion.button id="button-sell" type="submit">
          {isEditing ? 'Update' : 'Sell'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default Sell;