export interface UserProfile extends User {
    bio?: string;
    location?: string;
    followers: number;
    following: number;
    posts: number;
  }
  
  export interface UsersState {
    profiles: UserProfile[];
    loading: boolean;
    error: string | null;
  }