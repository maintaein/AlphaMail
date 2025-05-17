import React from 'react';
import loadingGif from '@/assets/images/ai-loading.gif'; // GIF 파일 경로
import { Typography } from '@/shared/components/atoms/Typography';

interface AiLoadingProps {
  message?: string;
}

const AiLoading: React.FC<AiLoadingProps> = ({ message = "메일 스레드 요약 중..." }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full p-6 pt-20">
      <img 
        src={loadingGif} 
        alt="AI 로딩 중" 
        className="w-120 h-90"
      />
      <Typography variant="titleSmall" color="#ADADAD" className="mt-2 text-center">
        {message}
      </Typography>
    </div>
  );
};

export default AiLoading;