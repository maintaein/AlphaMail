import axios from 'axios';
import { useUserStore } from '../stores/useUserStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: '/',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 에러 처리 (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 임시로 로그아웃 처리
        localStorage.removeItem('accessToken');
        useUserStore.getState().logout();
        window.location.href = '/login';
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        localStorage.removeItem('accessToken');
        useUserStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
