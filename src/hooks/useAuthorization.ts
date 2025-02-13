import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuthorization = (requiredAuth: boolean = true) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requiredAuth && !isAuthenticated) {
        router.push('/login');
      } else if (!requiredAuth && isAuthenticated) {
        router.push('/dashboard');
      }
    }
  }, [loading, isAuthenticated, requiredAuth, router]);

  return { user, loading, isAuthenticated };
};