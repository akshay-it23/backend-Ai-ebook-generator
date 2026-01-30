import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { setToken, setUser as saveUser, getToken, getUser as getSavedUser, clearAuth } from '../utils/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = getToken();
      const savedUser = getSavedUser();

      if (!token || !savedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Verify token with backend
      try {
        const response = await api.get(API_ENDPOINTS.PROFILE);
        setUser(response.user);
        saveUser(response.user);
      } catch (error) {
        console.error('Token verification failed:', error);
        clearAuth();
        setUser(null);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setUser(null);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });

      if (response.token && response.user) {
        setToken(response.token);
        saveUser(response.user);
        setUser(response.user);
        toast.success('Login successful!');
        navigate('/dashboard');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, { name, email, password });

      if (response.token && response.user) {
        setToken(response.token);
        saveUser(response.user);
        setUser(response.user);
        toast.success('Registration successful!');
        navigate('/dashboard');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const updateUser = async (updates) => {
    try {
      const response = await api.put(API_ENDPOINTS.PROFILE, updates);

      if (response.user) {
        saveUser(response.user);
        setUser(response.user);
        toast.success('Profile updated successfully!');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Profile update failed');
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

