import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient';
import { Router } from '@/routes/Router';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '@/shared/Layout/navBar';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <Router />
          <BrowserRouter>
            <div className="flex h-screen">
              <NavBar />
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
