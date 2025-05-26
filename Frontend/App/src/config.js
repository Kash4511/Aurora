// API endpoints configuration
export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: 'https://aurora-vtm6.onrender.com/login/',
    REGISTER: 'https://aurora-vtm6.onrender.com/register/',
    
    // Product endpoints
    PRODUCTS: 'https://aurora-vtm6.onrender.com/product_list/',
    PRODUCT_DETAIL: (id) => `https://aurora-vtm6.onrender.com/products/${id}/`,
    
    // Selling endpoints
    SELL: 'https://aurora-vtm6.onrender.com/sell/',
    
    // Dashboard endpoints
    DASHBOARD: 'https://aurora-vtm6.onrender.com/dash/',
    HOME: 'https://aurora-vtm6.onrender.com'
};

// Route paths for navigation
export const ROUTES = {
    EDIT_PRODUCT: (id) => `/sell/${id}`,
    PRODUCT_LIST: '/product_list',
    DASHBOARD: '/dash',
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/'
};

// Axios configuration
export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}; 