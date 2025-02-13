import axios from 'axios';

const createApiInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para manejar tokens
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para manejar errores
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Manejar token expirado
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Crear instancias para diferentes microservicios
export const authApi = createApiInstance(process.env.NEXT_PUBLIC_AUTH_SERVICE_URL);
export const userApi = createApiInstance(process.env.NEXT_PUBLIC_USER_SERVICE_URL);
export const contentApi = createApiInstance(process.env.NEXT_PUBLIC_CONTENT_SERVICE_URL);
