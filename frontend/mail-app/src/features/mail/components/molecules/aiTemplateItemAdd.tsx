import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface AiTemplateItemAddProps {
  onClick: () => void;
}

const AiTemplateItemAdd: React.FC<AiTemplateItemAddProps> = ({ onClick }) => {
  return (
    <div 
      className="flex items-center space-x-2 cursor-pointer mb-4 mt-2"
      onClick={onClick}
    >
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E1F3FD]">
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 4V20M4 12H20" 
            stroke="#2D95CE" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <Typography variant="body" className="text-[#2D95CE]">
        항목 추가
      </Typography>
    </div>
  );
};

export default AiTemplateItemAdd;