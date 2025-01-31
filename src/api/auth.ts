import api from '../utils/api';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: { 
    name: string; 
    email: string; 
    password: string 
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  verifyEmail: async (code: string) => {
    const response = await api.post('/auth/verify-email', { code });
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  }
};