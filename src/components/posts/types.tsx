export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
}

export interface CreatePostDTO {
  title: string;
  content: string;
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
}