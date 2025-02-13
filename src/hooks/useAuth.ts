import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User, LoginCredentials, RegisterCredentials } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
    } finally {
      setLoading(false);
    }
  };

const login = async (credentials: LoginCredentials) => {
  try {
    const response = await authService.login(credentials);
    setUser(response.user);
    router.push('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, error };
  }
};

const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await authService.register(credentials);
    setUser(response.user);
    router.push('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Registration failed:', error);
    return { success: false, error };
  }
};

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};