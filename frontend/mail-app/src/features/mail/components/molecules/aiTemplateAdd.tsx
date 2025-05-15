import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface AiTemplateAddProps {
  onClick: () => void;
}

const AiTemplateAdd: React.FC<AiTemplateAddProps> = ({ onClick }) => {
  return (
    <div 
      className="flex items-center space-x-2 cursor-pointer mb-6"
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E1F3FD]">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 4V20M4 12H20" 
            stroke="url(#plus-gradient)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="plus-gradient" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#62DDFF" />
              <stop offset="1" stopColor="#3098D1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Typography variant="titleSmall">
        새로운 템플릿 생성
      </Typography>
    </div>
  );
};

export default AiTemplateAdd;