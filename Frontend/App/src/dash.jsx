import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backOut, motion } from 'motion/react';
import './Css/dash.css';
import { useNavigate } from 'react-router-dom';

function Dash() {
    const navigator = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // 🔍 Search query state

    const get = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/dash/', {
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
            {/* ✅ Left Sidebar / Nav */}
            <motion.h1
                id='A'
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                Aurora
            </motion.h1>

            <motion.div id="nav"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <motion.div id='buy'>
                    <motion.button id='buy-button' onClick={() => navigator('/dash')}>Buy</motion.button>
                </motion.div>
                <motion.div id='sell'>
                    <motion.button id='sell-button' onClick={() => navigator('/sell')}>Sell</motion.button>
                </motion.div>
                <motion.div id='set'>
                    <motion.button id='set-button'>Settings</motion.button>
                </motion.div>
                <motion.div id='log'>
                    <motion.button id='log-button' onClick={() => navigator('/')}>Logout</motion.button>
                </motion.div>
            </motion.div>

            {/* ✅ Main Content */}
            <div style={{ flex: 1 }}>
                {/* 🔍 Search Input */}
                <motion.div
                
                 style={{ textAlign: 'center', marginTop: '30px' }}>
                    <motion.input
                       id='search'
                        type="text"
                        placeholder="Search items"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '10px',
                            width: '600px',
                            borderRadius: '30px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            color: 'white',
                            marginBottom: '20px',
                            marginLeft: '-90px',
                            marginTop: '5px',
                        }}
                    />
                </motion.div>

                {/* 🧾 Cards Section */}
                <motion.div className='cards-wrapper'
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 40px',
                        boxSizing: 'border-box',
                    }}
                >
                    <motion.div className='cards'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '0px',
                            marginRight: '100px',
                            marginLeft: '-70px',
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
                                    <strong>{item.item_name}</strong> - <strong>{item.item_price}</strong><br />
                                    {item.item_description}<br />
                                    <span style={{ fontStyle: 'italic' }}>
                                        ({item.city}, {item.state}, {item.country})
                                    </span><br />
                                    ({item.phone_number}, {item.social_ID})<br />
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
