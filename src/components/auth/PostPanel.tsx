import { contentApi } from '../../lib/api/axios';
import { Post } from '@/components/posts/types';

export const postService = {
  async getPosts(page = 1, limit = 10) {
    const { data } = await contentApi.get<{ posts: Post[]; total: number }>(
      `/posts?page=${page}&limit=${limit}`
    );
    return data;
  },

  async createPost(post: { title: string; content: string }) {
    const { data } = await contentApi.post<Post>('/posts', post);
    return data;
  },

  async updatePost(id: string, post: Partial<Post>) {
    const { data } = await contentApi.put<Post>(`/posts/${id}`, post);
    return data;
  },

  async deletePost(id: string) {
    await contentApi.delete(`/posts/${id}`);
  }
};