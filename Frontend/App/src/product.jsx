import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Product ID from URL:', id);
    axios.get(`http://127.0.0.1:8000/product/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setProduct(res.data))
      .catch(err => {
        if (err.response?.status === 404) {
          setError('Product not found.');
        } else if (err.response?.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('An error occurred.');
        }
        console.error(err);
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.item_name}</h2>
      <img src={product.image} alt={product.item_name} style={{ width: '400px' }} />
      <p>{product.item_description}</p>
      <p>Price: {product.item_price}</p>
      <p>Location: {product.city}, {product.state}, {product.country}</p>
      <p>Contact: {product.phone_number}</p>
      <p>Social ID: {product.social_ID}</p>
    </div>
  );
}

export default ProductDetail;