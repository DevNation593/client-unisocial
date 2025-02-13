import React, { useState } from 'react';
import { Post } from './types';
import { Pencil, Trash2, Check } from 'lucide-react';

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
        <h4 className="text-lg font-medium text-indigo-600">{post.title}</h4>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">{post.author}</p>
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1 hover:bg-gray-100 rounded-full"
              title={isEditing ? "Guardar cambios" : "Editar post"}
              aria-label={isEditing ? "Guardar cambios" : "Editar post"}
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
              title="Eliminar post"
              aria-label="Eliminar post"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="mt-2">
          <label htmlFor="edit-content" className="sr-only">
            Editar contenido del post
          </label>
          <textarea
            id="edit-content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="Escribe el contenido del post"
            aria-label="Contenido del post"
          />
        </div>
      ) : (
        <p className="mt-2 text-gray-600">{post.content}</p>
      )}
    </li>
  );
};