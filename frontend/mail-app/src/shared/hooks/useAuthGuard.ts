import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 로그인이 필요하지 않은 페이지 목록
const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password'];

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const isPublicPath = PUBLIC_PATHS.some(path => currentPath.startsWith(path));

    if (!accessToken && !isPublicPath) {
      // 이미 로그인 페이지로 이동 중인 경우는 무시
      if (currentPath !== '/login') {
        navigate('/login', { 
          state: { from: location },
          replace: true 
        });
      }
    } else if (accessToken && isPublicPath) {
      // 이미 로그인된 상태에서 로그인 페이지 등에 접근하면 홈으로
      navigate('/', { replace: true });
    }
  }, [currentPath, navigate, location]);
}; 