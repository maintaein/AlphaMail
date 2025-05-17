import React from 'react';

type TagType = '발주서' | '일정' | '견적서' | '거래처';

interface AiAssistantRowTagProps {
  type: TagType;
}

export const AiAssistantRowTag: React.FC<AiAssistantRowTagProps> = ({ type }) => {
  // 태그 타입에 따른 배경색 설정
  const getBgColor = () => {
    switch (type) {
      case '발주서':
        return 'bg-[#66BAE4]';
      case '일정':
        return 'bg-[#E6A62F]';
      case '견적서':
        return 'bg-[#479A1A]';
      case '거래처':
        return 'bg-[#D66868]';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`${getBgColor()} text-white px-2 py-1 text-xs font-pretendard`}>
      {type}
    </div>
  );
};