"use client";

import React, { useState } from 'react';
import { Post } from '@/types/post';
import { Pencil, Trash2, Check } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, post: Partial<Post>) => void;
}

export const PostCard = ({ post, onDelete, onEdit }: PostCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => {
    if (onEdit && isEditing) {
      onEdit(post.id, { content: editedContent });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-medium text-indigo-600">{post.user}</p>
          <span className="text-sm text-gray-500">
            {format(new Date(post.timestamp), "d 'de' MMMM 'a las' HH:mm", { locale: es })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1 hover:bg-gray-100 rounded-full"
              title={isEditing ? "Guardar cambios" : "Editar publicación"}
              aria-label={isEditing ? "Guardar cambios" : "Editar publicación"}
            >
              {isEditing ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Pencil className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Eliminar publicación"
              aria-label="Eliminar publicación"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="mt-3">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="Escribe tu publicación"
          />
        </div>
      ) : (
        <p className="mt-2 text-gray-600">{post.content}</p>
      )}

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Imagen de la publicación"
          className="mt-3 rounded-lg max-h-96 w-full object-cover"
        />
      )}
    </li>
  );
};

export default PostCard;