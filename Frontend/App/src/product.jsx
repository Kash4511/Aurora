import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Css/dash.css';
import './Css/product.css';
import Navigation from './components/Navigation';
import { API_ENDPOINTS } from './config';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchProductAndSuggestions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Please login to view product details');
          return;
        }

        // Fetch main product
        const productResponse = await axios.get(API_ENDPOINTS.PRODUCT_DETAIL(id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(productResponse.data);

        // Fetch suggested products (for now, we'll fetch all products and filter)
        const suggestedResponse = await axios.get(API_ENDPOINTS.DASHBOARD, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter out the current product and get 4 random suggestions
        const filtered = suggestedResponse.data
          .filter(p => p.id !== parseInt(id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setSuggestedProducts(filtered);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response?.status === 404) {
          setError('Product not found. It may have been removed.');
        } else if (err.response?.status === 401) {
          setError('Your session has expired. Please login again.');
          navigate('/login');
        } else {
          setError('An error occurred while fetching the product details.');
        }
      }
    };

    fetchProductAndSuggestions();
  }, [id, navigate]);

  if (error) {
    return (
      <div className="product-container">
        <Navigation />
        <div className="product-content">
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-container">
        <Navigation />
        <div className="product-content">
          <motion.div 
            className="loading-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading product details...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-container">
      <Navigation />
      <div className="product-content">
        <motion.div 
          className="product-detail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="product-main">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.item_name} 
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h2 className="product-title">{product.item_name}</h2>
              <p className="product-description">{product.item_description}</p>
              <p className="product-price">Price: {product.item_price}</p>
              <p className="product-location">
                Location: {product.city}, {product.state}, {product.country}
              </p>
              <p className="product-contact">
                Contact: {product.phone_number}<br />
                Social ID: {product.social_ID}
              </p>
            </div>
          </div>

          {/* Suggested Products Section */}
          <motion.div 
            className="suggested-products"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="suggested-title">You May Also Like</h3>
            <div className="suggested-grid">
              {suggestedProducts.map((suggested) => (
                <motion.div
                  key={suggested.id}
                  className="suggested-card"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/product/${suggested.id}`)}
                >
                  <img src={suggested.image} alt={suggested.item_name} />
                  <div className="suggested-info">
                    <h4>{suggested.item_name}</h4>
                    <p className="suggested-price">{suggested.item_price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetail;