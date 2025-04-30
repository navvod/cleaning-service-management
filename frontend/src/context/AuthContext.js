import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for token and fetch user profile on app load
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await API.getProfile();
          setUser(response.user);
        } catch (error) {
          console.error('Error loading user:', error.response?.data || error.message);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      const response = await API.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };

  // Login a user
  const login = async (userData) => {
    try {
      const response = await API

.login(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  // Logout a user
  const logout = () => {
    API.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;