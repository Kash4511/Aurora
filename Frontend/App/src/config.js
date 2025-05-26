const API_BASE_URL = 'https://aurora-vtm6.onrender.com';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login/`,
    REGISTER: `${API_BASE_URL}/register/`,
    DASH: `${API_BASE_URL}/dash/`,
    PRODUCTS: `${API_BASE_URL}/products/`,
    SELL: `${API_BASE_URL}/sell/`,
};

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false  // Changed to false since we're using token-based auth
}; 