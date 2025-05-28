import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backOut, motion } from 'motion/react';
import './Css/dash.css';
import { useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import { API_ENDPOINTS } from './config';

function Dash() {
    const navigator = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const get = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.get(API_ENDPOINTS.DASHBOARD, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response?.data?.message || 'Failed to fetch products');
            if (error.response?.status === 401) {
                localStorage.removeItem('access_token');
                navigator('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, []);

    const handleProductClick = (productId) => {
        navigator(`/product/${productId}`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((item) =>
        item.item_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ color: 'red' }}>{error}</div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex' }}>
            <Navigation />
            <div style={{ flex: 1 }}>
                <motion.div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <motion.div
                        id="search-bar"
                        style={{
                            top: '-5px',
                            left: '600px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            backgroundColor: '#262525',
                            borderRadius: '30px',
                            padding: '8px 20px',
                            width: '600px',
                            marginLeft: '-90px',
                            boxSizing: 'border-box',
                            position: 'relative',
                        }}
                    >
                        <div id='icon'
                            style={{
                                color: '#86B66F',
                                marginRight: '10px',
                                borderRight: '1px solid #444',
                                paddingRight: '10px',
                                fontSize: '18px',
                            }}>
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                padding: '5px 10px',
                            }}
                        />
                    </motion.div>
                </motion.div>

                <motion.div className='cards-wrapper'
                    style={{
                        maxWidth: '1200px',
                        marginLeft: '250px',
                        marginRight: '-100px',
                        padding: '0 40px',
                        boxSizing: 'border-box',
                    }}
                >
                    <motion.div className='cards'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                        }}
                    >
                        {filteredData.length === 0 ? (
                            <div style={{ 
                                gridColumn: '1 / -1', 
                                textAlign: 'center', 
                                padding: '20px',
                                color: '#666'
                            }}>
                                No products found matching your search.
                            </div>
                        ) : (
                            filteredData.map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    style={{
                                        borderRadius: '10px',
                                        padding: '10px',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    {item.image && (
                                        <motion.img
                                            src={item.image}
                                            alt={item.item_name}
                                            style={{
                                                width: '100%',
                                                height: '250px',
                                                objectFit: 'contain',
                                                borderRadius: '10px',
                                                marginTop: '10px',
                                                cursor: 'pointer',
                                                padding: '10px',
                                                backgroundColor: '#f5f5f5',
                                            }}
                                            onClick={() => handleProductClick(item.id)}
                                            whileHover={{
                                                scale: 1.05,
                                                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                                                backgroundColor: '#f0f0f0',
                                            }}
                                            onError={(e) => {
                                                console.error('Image failed to load:', item.image);
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                            }}
                                        />
                                    )}
                                    <motion.div
                                        id='item'
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        onClick={() => handleProductClick(item.id)}
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
                                        <strong>{item.item_name}</strong> - <strong>₹{item.item_price}</strong><br />
                                        {item.item_description}<br />
                                        <span style={{ fontStyle: 'italic' }}>
                                            ({item.city}, {item.state}, {item.country})
                                        </span><br />
                                        {item.phone_number && <span>Phone: {item.phone_number}</span>}<br />
                                        
                                    </motion.div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Dash;