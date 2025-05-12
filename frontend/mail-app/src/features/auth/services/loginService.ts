import { api } from '../../../shared/lib/axiosInstance';
import { LoginResponse } from '../types/login';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/api/login', { email, password });
  const { accessToken, refreshToken } = response.data;
  
  // 토큰들을 localStorage에 저장
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  return response.data;
};
