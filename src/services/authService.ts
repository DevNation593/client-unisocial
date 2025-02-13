import axios from 'axios';
import { RegisterDTO, LoginDTO, AuthResponse } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://54.152.18.209';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  async register(data: RegisterDTO): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/api/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(data: LoginDTO): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/api/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};