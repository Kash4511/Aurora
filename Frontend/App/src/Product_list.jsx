import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Css/dash.css';
import './Css/product.css';
import Navigation from './components/Navigation';
import { API_ENDPOINTS, ROUTES } from './config';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(API_ENDPOINTS.PRODUCTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('API Response:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(API_ENDPOINTS.PRODUCT_DETAIL(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditClick = (product) => {
    navigate(ROUTES.EDIT_PRODUCT(product.id));
  };

  return (
    <div className="product-container">
      <Navigation />
      
      {/* Main Content */}
      <div className="product-content">
        <motion.h2
          className="product-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          My Products
        </motion.h2>
        
        {products.length === 0 ? (
          <motion.p
            className="no-products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No products found.
          </motion.p>
        ) : (
          <motion.div className="product-grid">
            {products.map((product) => {
              console.log('Product image URL:', product.image);
              return (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div className="product-image-container" style={{
                    width: '100%',
                    height: '250px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px'
                  }}>
                    <motion.img
                      src={product.image}
                      alt={product.item_name}
                      style={{
                          width: '90%',
                          height: '90%',
                          objectFit: 'contain',
                          borderRadius: '10px',
                          cursor: 'pointer'
                      }}
                      whileHover={{
                          scale: 1.05,
                          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                      }}
                      onError={(e) => {
                          console.error('Image failed to load:', {
                            url: product.image,
                            productId: product.id,
                            productName: product.item_name
                          });
                          e.target.style.display = 'none';
                          e.target.parentElement.style.display = 'none';
                      }}
                      onLoad={(e) => {
                          console.log('Image loaded successfully:', {
                            url: product.image,
                            productId: product.id,
                            productName: product.item_name
                          });
                      }}
                    />
                  </div>
                  <div className="product-details">
                    <div className="product-header">
                      <h2 className="product-name">{product.item_name}</h2>
                      <p className="product-description">{product.item_description}</p>
                    </div>
                    <div className="product-info">
                      <p className="product-price">Price: {product.item_price}</p>
                      <p className="product-location">Location: {product.city}, {product.state}, {product.country}</p>
                      <p className="product-contact">
                        Contact: {product.phone_number}<br />
                        Social ID: {product.social_ID}
                      </p>
                    </div>
                    <div className="product-buttons">
                      <motion.button
                        className="edit-button"
                        onClick={() => handleEditClick(product)}
                        whileHover={{ scale: 1.05 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        className="delete-button"
                        onClick={() => handleDelete(product.id)}
                        whileHover={{ scale: 1.05 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProductList;

