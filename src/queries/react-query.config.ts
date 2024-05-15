import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const QUERY_KEYS = {
  query: {
    user: 'user',
    
  },

  mutation: {
   
  },
} as const;
