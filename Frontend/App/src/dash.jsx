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
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState('');
    const priceOptions = [
        { label: 'Below ₹1,000', value: 'below_1000' },
        { label: '₹1,000 – ₹9,000', value: '1000_9000' },
        { label: '₹10,000 – ₹50,000', value: '10000_50000' },
        { label: '₹50,000 – ₹1,00,000', value: '50000_100000' },
        { label: 'Above ₹1,00,000', value: 'above_100000' },
    ];
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');
    const sortOptions = [
        { label: 'Low to High', value: 'low_high' },
        { label: 'High to Low', value: 'high_low' },
    ];
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const dateOptions = [
        { label: 'Last 7 days', value: '7' },
        { label: 'Last 30 days', value: '30' },
        { label: 'Last 90 days', value: '90' },
        { label: 'All Time', value: 'all' },
    ];

    // List of Indian states
    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
        'Ladakh', 'Puducherry', 'Chandigarh', 'Andaman and Nicobar Islands',
        'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
    ];

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

    useEffect(() => {
        // Close dropdown on outside click
        const handleClickOutside = (event) => {
            if (!event.target.closest('#location-dropdown') && !event.target.closest('#fil-but1')) {
                setShowStateDropdown(false);
            }
            if (!event.target.closest('#price-dropdown') && !event.target.closest('#fil-but2')) {
                setShowPriceDropdown(false);
            }
            if (!event.target.closest('#date-dropdown') && !event.target.closest('#fil-but3')) {
                setShowDateDropdown(false);
            }
            if (!event.target.closest('#sort-dropdown') && !event.target.closest('#fil-but4')) {
                setShowSortDropdown(false);
            }
        };
        if (showStateDropdown || showPriceDropdown || showDateDropdown || showSortDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showStateDropdown, showPriceDropdown, showDateDropdown, showSortDropdown]);

    const handleProductClick = (productId) => {
        navigator(`/product/${productId}`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter logic: search + state + price + date
    let filteredData = data.filter((item) => {
        const matchesSearch =
            item.item_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.item_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.country?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState ? (item.state?.toLowerCase() === selectedState.toLowerCase()) : true;
        let matchesPrice = true;
        if (selectedPrice) {
            const price = Number(item.item_price);
            if (selectedPrice === 'below_1000') matchesPrice = price < 1000;
            else if (selectedPrice === '1000_9000') matchesPrice = price >= 1000 && price <= 9000;
            else if (selectedPrice === '10000_50000') matchesPrice = price >= 10000 && price <= 50000;
            else if (selectedPrice === '50000_100000') matchesPrice = price >= 50000 && price <= 100000;
            else if (selectedPrice === 'above_100000') matchesPrice = price > 100000;
        }
        let matchesDate = true;
        if (selectedDate && selectedDate !== 'all') {
            const days = parseInt(selectedDate, 10);
            const now = new Date();
            const posted = new Date(item.date_posted);
            const diffDays = (now - posted) / (1000 * 60 * 60 * 24);
            matchesDate = diffDays <= days;
        }
        return matchesSearch && matchesState && matchesPrice && matchesDate;
    });
    // Sort logic
    if (selectedSort === 'low_high') {
        filteredData = [...filteredData].sort((a, b) => Number(a.item_price) - Number(b.item_price));
    } else if (selectedSort === 'high_low') {
        filteredData = [...filteredData].sort((a, b) => Number(b.item_price) - Number(a.item_price));
    }

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
        <div style={{ display: 'flex', background: '#F7F7F7', minHeight: '100vh' }}>
            <Navigation />
            <div style={{ flex: 1 }}>
                <motion.div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <motion.div
                        id="search-bar"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{
                            top: '-0px',
                            left: '510px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '59.006px',
                            
                            backgroundColor: '#262525',
                            borderRadius: '47px',
                            padding: '8px 20px',
                            width: '694.962px',
                            marginLeft: '-90px',
                            boxSizing: 'border-box',
                            position: 'relative',
                        }}
                    >
 
                        <div id='icon'
                            style={{
                                color: '#86B66F',
                                marginRight:'10px',
                                borderRight: '1px solid #444',
                                paddingRight: '50px',
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

                <motion.div id='l' 
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ marginTop: '2px', marginLeft: '20px' }}>
                    <motion.h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '40px' }}>Products</motion.h1>
                </motion.div>
                
                <motion.div id='line2'
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                        width: '50px',
                        height: '2px',
                        background: '#D9D9D9',
                        margin: '10px 0 20px 0',
                        borderRadius: '1px',
                        marginLeft: '355px',
                        marginTop: '-30px',
                        rotate: 90,
                    }}
                >
                </motion.div>
                <motion.div
                    id="fil-but"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ fontSize: '23px', fontFamily: 'Poppins, sans-serif' }}
                >
                    Filter
                    <motion.div id='fil-image'>
                        <motion.div id='arrow'></motion.div>
                    </motion.div>
                </motion.div>
                <motion.div
                    id="fil-but1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                        fontSize: '23px',
                        fontFamily: 'Poppins, sans-serif',
                        position: 'relative',
                        display: 'inline-block',
                        
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        
                        lineHeight: '59.006px',
                        cursor: 'pointer',
                    }}
                    onClick={() => setShowStateDropdown((prev) => !prev)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                        <span style={{}}>Location</span>
                        <motion.div id='arrow1' style={{ marginLeft: '8px' }}></motion.div>
                    </div>
                    {/* Dropdown overlay */}
                    {showStateDropdown && (
                        <div
                            id="location-dropdown"
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                background: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                width: '270px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                marginTop: '8px',
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold', background: '#f7f7f7' }}>
                                Select State
                                {selectedState && (
                                    <span
                                        style={{ float: 'right', color: '#007bff', cursor: 'pointer', fontWeight: 'normal' }}
                                        onClick={() => setSelectedState('')}
                                    >
                                        Clear
                                    </span>
                                )}
                            </div>
                            {indianStates.map((state) => (
                                <div
                                    key={state}
                                    style={{
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        background: selectedState === state ? '#e6f7ff' : 'white',
                                        color: selectedState === state ? '#1890ff' : '#333',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    onClick={() => {
                                        setSelectedState(state);
                                        setShowStateDropdown(false);
                                    }}
                                >
                                    {state}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
                <motion.div
                    id="fil-but2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                        fontSize: '23px',
                        fontFamily: 'Poppins, sans-serif',
                        position: 'relative',
                        display: 'inline-block',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        paddingRight: '20px',
                        
                        lineHeight: '59.006px',
                        cursor: 'pointer',
                    }}
                    onClick={() => setShowPriceDropdown((prev) => !prev)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                        <span style={{}}>Price Range</span>
                        <motion.div id='arrow2' style={{ marginLeft: '8px' }}></motion.div>
                    </div>
                    {/* Dropdown overlay */}
                    {showPriceDropdown && (
                        <div
                            id="price-dropdown"

                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                background: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                width: '270px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                marginTop: '8px',
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold', background: '#f7f7f7' }}>
                                Select Price
                                {selectedPrice && (
                                    <span
                                        style={{ float: 'right', color: '#007bff', cursor: 'pointer', fontWeight: 'normal' }}
                                        onClick={() => setSelectedPrice('')}
                                    >
                                        Clear
                                    </span>
                                )}
                            </div>
                            {priceOptions.map((option) => (
                                <div
                                    key={option.value}
                                    style={{
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        background: selectedPrice === option.value ? '#e6f7ff' : 'white',
                                        color: selectedPrice === option.value ? '#1890ff' : '#333',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    onClick={() => {
                                        setSelectedPrice(option.value);
                                        setShowPriceDropdown(false);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
                <motion.div
                    id="fil-but3"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                        fontSize: '23px',
                        fontFamily: 'Poppins, sans-serif',
                        position: 'relative',
                        display: 'inline-block',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        paddingRight: '20px',
                        lineHeight: '59.006px',
                        cursor: 'pointer',
                    }}
                    onClick={() => setShowDateDropdown((prev) => !prev)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                        <span>Date Posted</span>
                        <motion.div id='arrow3' style={{ marginLeft: '8px' }}></motion.div>
                    </div>
                    {/* Dropdown overlay */}
                    {showDateDropdown && (
                        <div
                            id="date-dropdown"

                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                background: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                width: '270px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                marginTop: '8px',
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold', background: '#f7f7f7' }}>
                                Select Date
                                {selectedDate && (
                                    <span
                                        style={{ float: 'right', color: '#007bff', cursor: 'pointer', fontWeight: 'normal' }}
                                        onClick={() => setSelectedDate('')}
                                    >
                                        Clear
                                    </span>
                                )}
                            </div>
                            {dateOptions.map((option) => (
                                <div
                                    key={option.value}
                                    style={{
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        background: selectedDate === option.value ? '#e6f7ff' : 'white',
                                        color: selectedDate === option.value ? '#1890ff' : '#333',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    onClick={() => {
                                        setSelectedDate(option.value);
                                        setShowDateDropdown(false);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
                <motion.div
                    id="fil-but4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                        fontSize: '23px',
                        fontFamily: 'Poppins, sans-serif',
                        position: 'relative',
                        display: 'inline-block',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        paddingRight: '20px',
                        lineHeight: '59.006px',
                        cursor: 'pointer',
                    }}
                    onClick={() => setShowSortDropdown((prev) => !prev)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                        <span>Sorted by</span>
                        <motion.div id='arrow4' style={{ marginLeft: '8px' }}></motion.div>
                    </div>
                    {/* Dropdown overlay */}
                    {showSortDropdown && (
                        <div
                            id="sort-dropdown"
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                background: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                width: '270px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                marginTop: '8px',
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold', background: '#f7f7f7' }}>
                                Select Sort
                                {selectedSort && (
                                    <span
                                        style={{ float: 'right', color: '#007bff', cursor: 'pointer', fontWeight: 'normal' }}
                                        onClick={() => setSelectedSort('')}
                                    >
                                        Clear
                                    </span>
                                )}
                            </div>
                            {sortOptions.map((option) => (
                                <div
                                    key={option.value}
                                    style={{
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        background: selectedSort === option.value ? '#e6f7ff' : 'white',
                                        color: selectedSort === option.value ? '#1890ff' : '#333',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    onClick={() => {
                                        setSelectedSort(option.value);
                                        setShowSortDropdown(false);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                
                <motion.div className='cards-wrapper'
                    style={{
                        maxWidth: '1200px',
                        marginLeft: '190px',
                        marginTop:'130px',
                        padding: '0px',
                        boxSizing: 'border-box',
                    }}
                >
                    <motion.div className='cards'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '40px',
                        }}
                    >
                        {filteredData.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: '#666' }}>
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
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            aspectRatio: '1 / 1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={item.image || 'https://via.placeholder.com/300?text=No+Image'}
                                            alt={item.item_name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '20px',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                            onError={e => {
                                                e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                                            }}
                                        />
                                    </div>
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