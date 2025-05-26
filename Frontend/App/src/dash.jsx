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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const get = async () => {
        try {
            const token = localStorage.getItem('access_token');
            console.log('Token from localStorage:', token);
            
            if (!token) {
                console.error('No token found');
                navigator('/login');
                return;
            }

            console.log('Fetching dashboard data from:', API_ENDPOINTS.DASH);
            const response = await axios.get(API_ENDPOINTS.DASH, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Dashboard response:', response);
            console.log('Dashboard data received:', response.data);
            
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else {
                console.error('Received non-array data:', response.data);
                setError('Invalid data format received from server');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            console.error('Error response:', error.response);
            if (error.response?.status === 401) {
                console.log('Unauthorized, redirecting to login...');
                navigator('/login');
            }
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>Loading dashboard data...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2 style={{ color: 'red' }}>{error}</h2>
            </div>
        );
    }

    // Filter the data based on the search query
    const filteredData = data.filter((item) =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        {filteredData.map((item, index) => (
                            <motion.div
                                key={index}
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
                                            objectFit: 'cover',
                                            borderRadius: '15px',
                                            marginTop: '10px',
                                            cursor: 'pointer',
                                            padding: '10px',
                                        }}
                                        onClick={() => navigator(`/product/${item.id}`)}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                                            backgroundColor: '#f0f0f0',
                                        }}
                                    />
                                )}
                                <motion.div
                                    id='item'
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    onClick={() => navigator(`/product/${item.id}`)}
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
                                    </span>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Dash;