import axios from 'axios';

const api = axios.create({
    baseURL: 'https://aurora-vtm6.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false,
});

export default api;
