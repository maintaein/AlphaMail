import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient';
import { Router } from '@/routes/Router';
  import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
  import { Suspense } from 'react';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
