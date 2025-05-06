import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography } from '@/shared/components/atoms/Typography';
import { Button } from '@/shared/components/atoms/button';
import './mailResultTemplate.css'; 

interface ResultState {
  status: 'success' | 'error';
  code?: number;
  message?: string;
}

const MailResultTemplate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultState;
  
  // 결과 상태가 없으면 메일 목록으로 리다이렉트
  useEffect(() => {
    if (!state) {
      navigate('/mail');
    }
  }, [state, navigate]);
  
  if (!state) {
    return null;
  }
  
  const handleGoToList = () => {
    navigate('/mail');
  };
  
  const handleNewMail = () => {
    navigate('/mail/write');
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow p-8">
      {state.status === 'success' ? (
        <>
          {/* 고정된 애니메이션 컨테이너 */}
          <div className="w-32 h-32 mb-8 rounded-full bg-[#CDECFC] flex items-center justify-center relative overflow-hidden">
            {/* 종이비행기 아이콘 */}
            <div className="paper-airplane-container">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#66BAE4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
            </div>
          </div>
          
          <Typography variant="titleLarge" className="mb-6 text-center">
            메일이 성공적으로 전송되었습니다
          </Typography>
          
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleNewMail}>
              메일 쓰기
            </Button>
            <Button variant="primary" onClick={handleGoToList}>
              메일 목록
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#EF4444"/>
            </svg>
          </div>
          <Typography variant="titleLarge" className="mb-4 text-center">
            메일 전송에 실패했습니다
          </Typography>
          <Typography variant="body" className="text-gray-500 mb-2 text-center">
            {state.code && `오류 코드: ${state.code}`}
          </Typography>
          <Typography variant="body" className="text-gray-500 mb-8 text-center">
            {state.message || '알 수 없는 오류가 발생했습니다'}
          </Typography>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleNewMail}>
              메일 쓰기
            </Button>
            <Button variant="primary" onClick={handleGoToList}>
              메일 목록
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MailResultTemplate;