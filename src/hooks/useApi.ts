import { useState } from 'react';
import { AxiosError } from 'axios';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}

type ApiParams = Record<string, unknown>;

export function useApi<T, P extends ApiParams[]>(
  apiCall: (...args: P) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = async (...args: P) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
        options.onError?.(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { execute, data, error, loading };
}