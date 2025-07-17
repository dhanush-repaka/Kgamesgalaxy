import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

// Custom hook for API calls with loading states and error handling
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      toast({
        title: "Error",
        description: err.response?.data?.detail || err.message || "An error occurred",
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dependencies.length > 0) {
      execute();
    }
  }, dependencies);

  return { data, loading, error, execute };
};

// Hook for form submissions
export const useApiMutation = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const mutate = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(data);
      return result;
    } catch (err) {
      setError(err);
      toast({
        title: "Error",
        description: err.response?.data?.detail || err.message || "An error occurred",
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};