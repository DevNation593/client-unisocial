export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
}

export interface CreatePostFormProps {
  onSubmit: (post: { title: string; content: string }) => Promise<void>;
}

export interface PostListProps {
  posts: Post[];
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string, post: Partial<Post>) => Promise<void>;
}