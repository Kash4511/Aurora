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

    const filteredData = data.filter((item) =>
        item.item_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city?.toLowerCase().includes(searchQuery.toLowerCase())
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
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    {item.image && (
                                        <motion.div className="product-image">
                                            <motion.img
                                                src={item.image}
                                                alt={item.item_name}
                                                style={{
                                                    width: '100%',
                                                    height: '250px',
                                                    objectFit: 'cover',
                                                    borderRadius: '15px',
                                                    marginTop: '10px',
                                                    cursor: 'pointer',
                                                    padding: '8px',
                                                }}
                                                onClick={() => navigator(`/product/${item.id}`)}
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
                                        </motion.div>
                                    )}
                                    <motion.div
                                        id='item'
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        onClick={() => navigator(`/product/${item.id}`)}
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        style={{
                                            marginTop: '10px',
                                            cursor: 'pointer',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px',
                                        }}
                                    >
                                        <div style={{ 
                                            fontSize: '1.2em', 
                                            fontWeight: 'bold',
                                            color: '#333',
                                        }}>
                                            {item.item_name}
                                        </div>
                                        <div style={{ 
                                            fontSize: '1.1em', 
                                            color: '#86B66F',
                                            fontWeight: 'bold',
                                        }}>
                                            ₹{item.item_price}
                                        </div>
                                        <div style={{ 
                                            fontSize: '0.9em',
                                            color: '#666',
                                            marginBottom: '8px',
                                        }}>
                                            {item.item_description}
                                        </div>
                                        <div style={{ 
                                            fontSize: '0.8em',
                                            color: '#888',
                                            fontStyle: 'italic',
                                        }}>
                                            {item.city}, {item.state}, {item.country}
                                        </div>
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