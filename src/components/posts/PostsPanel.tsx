"use client";

import React, { useState, useEffect } from 'react';
import { CreatePostForm } from './CreatePostForm';
import { PostList } from './PostList';
import { Post } from './types';
import { postService } from '@/services/postService';
import { Alert, AlertDescription } from "@/components/ui/alert";

export const PostsPanel = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await postService.getPosts();
      setPosts(response.posts);
    } catch (error) {
      setError('Error al cargar los posts');
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (newPost: { title: string; content: string }) => {
    try {
      const createdPost = await postService.createPost(newPost);
      setPosts(prevPosts => [createdPost, ...prevPosts]);
      setError(null);
    } catch (error) {
      setError('Error al crear el post');
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await postService.deletePost(id);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      setError(null);
    } catch (error) {
      setError('Error al eliminar el post');
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = async (id: string, updatedPost: Partial<Post>) => {
    try {
      const updated = await postService.updatePost(id, updatedPost);
      setPosts(prevPosts => prevPosts.map(post => post.id === id ? updated : post));
      setError(null);
    } catch (error) {
      setError('Error al actualizar el post');
      console.error('Error updating post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <CreatePostForm onSubmit={handleCreatePost} />
      <PostList 
        posts={posts} 
        onDelete={handleDeletePost}
        onEdit={handleEditPost}
      />
    </div>
  );
};

export default PostsPanel;