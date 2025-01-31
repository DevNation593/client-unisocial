import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    isAuthenticated: !!auth.token,
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    login: (credentials: { email: string; password: string }) => 
      dispatch(login(credentials)),
    logout: () => dispatch(logout()),
  };
};