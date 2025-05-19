import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/components/atoms/button';
import { Typography } from '../shared/components/atoms/Typography';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Typography variant="titleMedium" className="mb-4 text-red-500">404 - 페이지를 찾을 수 없습니다.</Typography>
      <Button
        variant="primary"
        onClick={() => navigate('/')}
        className="mt-2"
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound; 