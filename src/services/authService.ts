import { authApi } from '../lib/api/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await authApi.post<{ token: string; user: User }>('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(credentials: RegisterCredentials) {
    const { data } = await authApi.post<{ token: string; user: User }>('/auth/register', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async logout() {
    await authApi.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async getCurrentUser() {
    const { data } = await authApi.get<User>('/auth/me');
    return data;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};