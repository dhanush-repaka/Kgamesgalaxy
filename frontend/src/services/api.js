import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Booking service
export const bookingService = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};

// Availability service
export const availabilityService = {
  getByDate: async (date) => {
    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    const response = await api.get(`/availability/${dateStr}`);
    return response.data;
  }
};

// Game type service
export const gameTypeService = {
  getAll: async () => {
    const response = await api.get('/game-types');
    return response.data;
  }
};

// Gallery service
export const galleryService = {
  getAll: async () => {
    const response = await api.get('/gallery');
    return response.data;
  },
  
  create: async (imageData) => {
    const response = await api.post('/gallery', imageData);
    return response.data;
  }
};

// Settings service
export const settingsService = {
  get: async () => {
    const response = await api.get('/settings');
    return response.data;
  }
};

// Export the main api instance as well
export default api;