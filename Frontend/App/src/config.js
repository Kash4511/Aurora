// API endpoints configuration
export const API_ENDPOINTS = {
    LOGIN: 'http://localhost:8000/api/token/',
    REGISTER: 'http://localhost:8000/api/register/',
    REFRESH_TOKEN: 'http://localhost:8000/api/token/refresh/',
    PRODUCTS: 'http://localhost:8000/api/products/',
    USER_PROFILE: 'http://localhost:8000/api/user/profile/'
};

// Axios configuration
export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}; 