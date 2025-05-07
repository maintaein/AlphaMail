import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@/shared/components/atoms/Typography';
import { useHeaderStore } from '@/shared/stores/useHeaderStore';

export const HeaderContent: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { title, subtitle, mailStats } = useHeaderStore();
  
  // 경로에 따라 다른 헤더 내용 반환
  if (path === '/') {
    return (
      <Typography variant="titleSmall" className="text-[#606060]">
        김싸피님 오늘 업무도 파이팅하세요
      </Typography>
    );
  } else if (path.startsWith('/mail')) {
    // 메일 경로에 따라 다른 헤더 타이틀과 통계 표시
    let mailTitle = "메일";
    let showMailStats = false;
    
    if (path === '/mail') {
      mailTitle = "받은 메일함";
      showMailStats = true;
    } else if (path === '/mail/sent') {
      mailTitle = "보낸 메일함";
    } else if (path === '/mail/trash') {
      mailTitle = "휴지통";
    } else {
      mailTitle = title 
      showMailStats = path === '/mail';
    }
    
    return (
      <div className="flex items-center">
        <Typography variant="titleLarge">
          {mailTitle}
        </Typography>
        
        {/* 받은 메일함에서만 메일 통계 표시 */}
        {showMailStats && mailStats.totalCount >= 0 && (
          <Typography variant="body" className="text-gray-600 ml-4">
            전체메일 {mailStats.totalCount} / 안읽은메일 {mailStats.unreadCount}
          </Typography>
        )}
        
        {subtitle && (
          <Typography variant="body" className="text-gray-600 ml-4">
            {subtitle}
          </Typography>
        )}
      </div>
    );
  } else if (path === '/schedule') {
    return (
      <Typography variant="titleLarge">
        일정
      </Typography>
    );
  } else if (path === '/work') {
    return (
      <Typography variant="titleLarge">
        work
      </Typography>
    );
  }
  
  return null;
};