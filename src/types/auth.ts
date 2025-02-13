export interface RegisterDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export interface LoginDTO {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }