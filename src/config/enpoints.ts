export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      VERIFY_EMAIL: '/auth/verify-email',
    },
    POSTS: {
      LIST: '/posts',
      CREATE: '/posts',
      DELETE: (id: string) => `/posts/${id}`,
      UPDATE: (id: string) => `/posts/${id}`,
    },
    USERS: {
      PROFILE: (id: string) => `/users/${id}`,
      UPDATE_PROFILE: '/users/profile',
      LIST: '/users',
    },
  };