import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dash() {
    const [data, setData] = useState([]); // Define the state for storing fetched data

    const get = async () => {
        try {
            const token = localStorage.getItem('token'); // or sessionStorage
            const response = await axios.get('http://127.0.0.1:8000/dash/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data); // Log the fetched data
            setData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        get(); // Fetch data when the component is mounted
    }, []);

    return (
<ul>
    {data.map((item, index) => (
        <li key={index}>
            <strong>{item.item_name}</strong> - ₹{item.item_price} <br />
            {item.item_description} ({item.city}, {item.state}, {item.country}) <br />
            {item.image && (
<img
  src={item.image}
  alt={item.item_name}
  style={{ width: '200px', height: 'auto', marginTop: '10px' }}
/>
            )}
        </li>
    ))}
</ul>
    );
}

export default Dash;
