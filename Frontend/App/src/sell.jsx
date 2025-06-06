import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Css/sell.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from './components/Navigation';
import { API_ENDPOINTS } from './config';

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
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [socialPlatform, setSocialPlatform] = useState('Instagram');
  const [socialID, setSocialID] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    // Union Territories
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setItemPrice(value);
  };

  const formatPrice = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const socialPlatforms = ['Instagram', 'Telegram',  'Facebook', 'Twitter'];

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

      console.log('Fetching product details for ID:', productId);
      const response = await axios.get(API_ENDPOINTS.PRODUCT_DETAIL(productId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('Product details response:', response.data);
      
      if (!response.data) {
        throw new Error('No product data received');
      }

      const product = response.data;
      console.log('Setting product data:', product);
      setItemName(product.item_name || '');
      setItemPrice(product.item_price || '');
      setItemDescription(product.item_description || '');
      setCountry(product.country || '');
      setState(product.state || '');
      setCity(product.city || '');
      setPhoneNumber(product.phone_number || '');
      
      // Parse social ID if it exists
      if (product.social_ID) {
        const match = product.social_ID.match(/(.*?) ID - (.*)/);
        if (match) {
          setSocialPlatform(match[1]);
          setSocialID(match[2]);
        } else {
          setSocialID(product.social_ID);
        }
      } else {
        setSocialID('');
      }
      
      // Set image preview if either image or image_url exists
      if (product.image || product.image_url) {
        setImagePreview(product.image_url || product.image);
      }
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      console.error('Error response:', error.response);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      console.log('Image selected:', file.name);
    }
  };

  const handleSocialIDChange = (e) => {
    setSocialID(e.target.value);
  };

  const handleSocialPlatformChange = (e) => {
    setSocialPlatform(e.target.value);
  };

  const getFormattedSocialID = () => {
    // If the socialID already contains the platform, return it as is
    if (socialID.includes(' ID - ')) {
      return socialID;
    }
    return `${socialPlatform} ID - ${socialID}`;
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
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
    formData.append('social_ID', getFormattedSocialID());

    // Handle image upload only for new products
    if (!isEditing) {
      if (image instanceof File) {
        console.log('Appending new image to form data:', image.name);
        formData.append('image', image);
      } else {
        alert('Please select an image for your product');
        return;
      }
    }

    try {
      if (isEditing) {
        console.log('Updating product:', productId);
        // For editing, use PATCH instead of PUT to only update provided fields
        const response = await axios.patch(API_ENDPOINTS.PRODUCT_DETAIL(productId), formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Update response:', response.data);
        alert('Product updated successfully!');
      } else {
        console.log('Creating new product');
        await axios.post(API_ENDPOINTS.SELL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product uploaded successfully!');
      }
      navigator('/product_list');
    } catch (error) {
      console.error('Form submission error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) return;
        try {
          if (isEditing) {
            await axios.patch(API_ENDPOINTS.PRODUCT_DETAIL(productId), formData, {
              headers: {
                Authorization: `Bearer ${newToken}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            alert('Product updated successfully!');
          } else {
            await axios.post(API_ENDPOINTS.SELL, formData, {
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
          value={formatPrice(itemPrice)}
          onChange={handlePriceChange}
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
          disabled
          required
        />
        <motion.h1 id="sell-country">Country</motion.h1>

        <motion.select
          id="sell-item4"
          value={state}
          onChange={handleStateChange}
          required
          style={{
            width: '37%',
            padding: '10px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            backgroundColor: 'white'
          }}
        >
          <option value="">Select State</option>
          {indianStates.map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </motion.select>
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
          defaultCountry={null}
          countryCallingCodeEditable={true}
          value={phoneNumber}
          onChange={setPhoneNumber}
          required
        />
        <motion.h1 id="sell-phone-label">Phone Number</motion.h1>

        <motion.div style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%' }}>
          <motion.select
            id="social-platform"
            value={socialPlatform}
            onChange={handleSocialPlatformChange}
            style={{
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '105px',
              height: '30px',
              top: '595px',
              left: '510px',
              position: 'absolute',
              zIndex: '2',
            }}
          >
            {socialPlatforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </motion.select>

          <motion.input
            id="sell-social"
            type="text"
            placeholder={`Enter your ${socialPlatform} ID`}
            value={socialID}
            onChange={handleSocialIDChange}
            required

          />
        </motion.div>
        <motion.h1 id="sell-social-label">Social Media ID</motion.h1>

        {!isEditing && (
          <>
            <motion.input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <motion.h1 id="sell-image">Image</motion.h1>
          </>
        )}

        <motion.button id="button-sell" type="submit">
          {isEditing ? 'Update' : 'Sell'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default Sell;