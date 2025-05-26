import axios from 'axios';

const api = axios.create({
    baseURL: 'https://aurora-vtm6.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api; 