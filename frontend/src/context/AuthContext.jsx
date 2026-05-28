import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('visionboard_user');
    const storedToken = localStorage.getItem('visionboard_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const signIn = (userData, token) => {
    setUser(userData);
    localStorage.setItem('visionboard_user', JSON.stringify(userData));
    localStorage.setItem('visionboard_token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('visionboard_user');
    localStorage.removeItem('visionboard_token');
    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
