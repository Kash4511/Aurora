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
<div 
 className='cards'
 style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', left: '300px',right:'300px',top: '150px', position: 'absolute' }}>
  {data.map((item, index) => (
    <div key={index} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#fff' }}>
      {item.image && (
        <img
          src={item.image}
          alt={item.item_name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )}
      <div style={{ marginTop: '10px' }}>
        <strong>{item.item_name}</strong> - {item.item_price} <br />
        {item.item_description}<br />
        ({item.city}, {item.state}, {item.country}) <br />
        ({item.phone_number}, {item.social_ID}) <br />
      </div>
    </div>
  ))}
</div>

    );
}

export default Dash;
