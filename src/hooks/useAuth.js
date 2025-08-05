import { useState, useEffect } from 'react';
import { logout as authLogout } from '../services/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in (e.g., check localStorage, validate token, etc.)
        const token = localStorage.getItem('authToken');
        if (token) {
          // Here you would typically validate the token with your backend
          setIsAuthenticated(true);
          // Set user data if available
          const userData = JSON.parse(localStorage.getItem('userData') || 'null');
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (token, userData) => {
    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authLogout(); // Call your auth service's logout function
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth data regardless of server response
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };
};

export default useAuth;
