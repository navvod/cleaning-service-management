import axios from 'axios';

// Create an Axios instance with the base URL from the environment variable
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5100', // Fallback to localhost if not set
});

// Add a request interceptor to attach the JWT token to protected routes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User-related API calls
const register = async (userData) => {
  const response = await API.post('/api/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const login = async (userData) => {
  const response = await API.post('/api/auth/login', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const getProfile = async () => {
  const response = await API.get('/api/auth/profile');
  return response.data;
};

// Service-related API calls
const getServices = async () => {
  const response = await API.get('/api/service');
  return response.data;
};

const postServices = async () => {
  const response = await API.post('/api/service');
  return response.data;
};

// Booking-related API calls
const getBookings = async () => {
  const response = await API.get('/api/booking');
  return response.data;
};

const createBooking = async (bookingData) => {
  const response = await API.post('/api/booking', bookingData);
  return response.data;
};

const updateBooking = async (id, bookingData) => {
  const response = await API.put(`/api/booking/${id}`, bookingData);
  return response.data;
};

const deleteBooking = async (id) => {
  const response = await API.delete(`/api/booking/${id}`);
  return response.data;
};

// Logout function to clear token
const logout = () => {
  localStorage.removeItem('token');
};

// Assign the object to a variable before exporting
const api = {
  register,
  login,
  getProfile,
  getServices,
  postServices,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  logout,
};

export default api;