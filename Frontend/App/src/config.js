const API_BASE_URL = 'https://aurora-vtm6.onrender.com';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login/`,
    REGISTER: `${API_BASE_URL}/register/`,
    // Add other endpoints as needed
};

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
}; 