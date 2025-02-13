"use client";

import React, { useState, useEffect } from 'react';
import { CreatePostForm } from './CreatePostForm';
import { PostList } from './PostList';
import { Post } from './types';
import { postService } from '@/services/postService';
import { Alert, AlertDescription } from "@/components/ui/alert";

export const PostsPanel = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await postService.getPosts();
      setPosts(response.posts);
    } catch (err) {
      setError('Error al cargar los posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (newPost: { title: string; content: string }) => {
    try {
      const createdPost = await postService.createPost(newPost);
      setPosts([createdPost, ...posts]);
    } catch (err) {
      setError('Error al crear el post');
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      setError('Error al eliminar el post');
    }
  };

  const handleEditPost = async (id: string, updatedPost: Partial<Post>) => {
    try {
      const updated = await postService.updatePost(id, updatedPost);
      setPosts(posts.map(post => post.id === id ? updated : post));
    } catch (err) {
      setError('Error al actualizar el post');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
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