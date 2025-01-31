export interface Post {
    id: string;
    content: string;
    author: User;
    likes: number;
    comments: number;
    createdAt: string;
  }
  
  export interface PostsState {
    items: Post[];
    loading: boolean;
    error: string | null;
  }