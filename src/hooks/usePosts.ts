import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchPosts, createPost, deletePost } from '../store/slices/postsSlice';

export const usePosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);

  return {
    posts: posts.items,
    loading: posts.loading,
    error: posts.error,
    fetchPosts: () => dispatch(fetchPosts()),
    createPost: (data: { content: string }) => dispatch(createPost(data)),
    deletePost: (id: string) => dispatch(deletePost(id)),
  };
};