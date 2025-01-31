export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }