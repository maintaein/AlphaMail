import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@/shared/styles/tailwind.css';

async function main() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // 모의하지 않는 요청은 실제 네트워크로 전달
    });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

main();