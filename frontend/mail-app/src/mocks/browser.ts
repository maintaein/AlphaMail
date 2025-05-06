import { setupWorker } from 'msw/browser';
import { handlers } from './handler';

export const worker = setupWorker(...handlers);

worker.start({
  serviceWorker: {
    url: '/mockServiceWorker.js',
    options: {
      // 서비스 워커 옵션
    }
  },
  onUnhandledRequest: 'bypass'
});