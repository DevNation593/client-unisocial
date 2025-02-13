"use client";

import React from 'react';
import { Post } from './types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, post: Partial<Post>) => void;
}

export const PostList = ({ posts, onDelete, onEdit }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay posts disponibles
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
};