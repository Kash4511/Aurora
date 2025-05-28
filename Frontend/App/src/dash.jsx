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
    const [searchQuery, setSearchQuery] = useState(''); // 🔍 Search query state

    const get = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(API_ENDPOINTS.DASHBOARD, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        get();
    }, []);

    // 🔍 Filter the data based on the search query
    const filteredData = data.filter((item) =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex' }}>
            <Navigation />

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                {/* 🔍 Search Input */}
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
                        {/* Search Icon */}
                        <div id='icon'
                            style={{
                                color: '#86B66F',
                                marginRight: '10px',
                                borderRight: '1px solid #444',
                                paddingRight: '10px',
                                fontSize: '18px',
                            }}>
                        </div>

                        {/* Input */}
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

                {/* 🧾 Cards Section */}
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                            >
                                {item.image_url && (
                                    <motion.div 
                                        className="product-image"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            overflow: 'hidden',
                                            borderRadius: '8px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <motion.img
                                            src={item.image_url}
                                            alt={item.item_name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                            onClick={() => navigator(`/product/${item.id}`)}
                                            whileHover={{
                                                scale: 1.05,
                                            }}
                                            onError={(e) => {
                                                console.error('Image failed to load:', item.image_url);
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
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Dash;
