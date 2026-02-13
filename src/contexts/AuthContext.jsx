import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('AuthContext: found token, fetching profile...');
          const response = await authAPI.getProfile();
          console.log('AuthContext: profile fetched:', response.data);
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error loading auth from localStorage or server:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    console.log('AuthContext: calling login service...', credentials);
    const response = await authAPI.login(credentials);
    console.log('AuthContext: login service response:', response.data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
