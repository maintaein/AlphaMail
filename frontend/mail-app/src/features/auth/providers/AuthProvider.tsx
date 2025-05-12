import React, { useEffect } from 'react';
import { useUserStore } from '@/shared/stores/useUserStore';
import { useUser } from '../hooks/useUser';
import { Spinner } from '@/shared/components/atoms/spinner';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { login, logout } = useUserStore();
  const { data: user, isLoading, isError } = useUser();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    // 토큰이 있고 사용자 정보가 있는 경우에만 로그인 상태 업데이트
    if (accessToken && user && !isError) {
      login({
        ...user,
        id: String(user.id),
      }, accessToken);
    }

    // API 에러 발생 시 로그아웃 처리
    if (isError) {
      logout();
    }
  }, [user, isError, login, logout, accessToken]);

  // 로딩 중인 경우 스피너 표시 (토큰이 있는 경우에만)
  if (isLoading && accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  return <>{children}</>;
}; 