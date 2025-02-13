export interface Post {
  id: string;
  user: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
}

export interface CreatePostDTO {
  user: string;
  content: string;
  imageUrl?: string;
}