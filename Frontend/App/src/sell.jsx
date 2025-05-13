import React, { useState } from 'react';
import axios from 'axios';

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
    
    // <form onSubmit={handleSubmit}>
    //   <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
    //   <input type="number" placeholder="Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
    //   <textarea placeholder="Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
    //   <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
    //   <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
    //   <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
    //   <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
    //   <button type="submit">Sell</button>
    // </form>
  );
}

export default Sell;
