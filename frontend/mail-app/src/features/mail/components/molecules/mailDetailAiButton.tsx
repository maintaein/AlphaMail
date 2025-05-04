import React from 'react';
import { Button } from '@/shared/components/atoms/button';

interface MailDetailAiButtonProps {
  onAiAssistant: () => void;
  onTranslate: () => void;
  aiButtonWidth?: string;
  aiButtonHeight?: string;
  aiFontSize?: string;
}

export const MailDetailAiButton: React.FC<MailDetailAiButtonProps> = ({
  onAiAssistant,
  onTranslate,
  aiButtonWidth,
  aiButtonHeight,
  aiFontSize,
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {/* AI 어시스턴트 버튼 */}
      <button
        onClick={onAiAssistant}
        className="flex items-center justify-center px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 hover:opacity-80"
        style={{
          background: 'linear-gradient(90deg, #62DDFF 0%, #9D44CA 100%)',
          width: aiButtonWidth,
          height: aiButtonHeight,
          fontSize: aiFontSize
        }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          {/* 별 아이콘 */}
          <path 
            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" 
            fill="white"
          />
        </svg>
        AI 어시스턴트
      </button>
      
      {/* 번역 버튼 */}
      <Button variant="secondary" onClick={onTranslate}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path 
            d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z" 
            fill="currentColor"
          />
        </svg>
        번역
      </Button>
    </div>
  );
};