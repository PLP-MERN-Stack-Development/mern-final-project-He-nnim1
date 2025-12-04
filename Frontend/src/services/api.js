import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//interceptor to attach the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const api = {
  // --- AUTHENTICATION ---
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (name, email, password, role = 'buyer') => {
    // Ensuring the payload matches the expected structure in authRoutes.js
    const response = await apiClient.post('/auth/register', { name, email, password, role });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  // --- FARMERS ---
  getFarms: async () => {
    // Assuming you have added the necessary GET / route to farmerRoutes.js
    const response = await apiClient.get('/farmers');
    return response.data;
  },

  getFarmById: async (id) => {
    const response = await apiClient.get(`/farmers/${id}`);
    return response.data;
  },

  getFarmerProfile: async () => {
    const response = await apiClient.get('/farmers/me');
    return response.data;
  },

  updateFarmerProfile: async (data) => {
    const response = await apiClient.put('/farmers/me', data);
    return response.data;
  },

  // --- PRODUCTS ---
  getProducts: async ({ farmId, category, search } = {}) => {
    const params = {};
    if (farmId) params.farm = farmId;
    if (category) params.category = category;
    if (search) params.keyword = search; 

    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await apiClient.post('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  // --- ORDERS ---
  createOrder: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await apiClient.get('/orders/my-orders');
    return response.data;
  },
};