import React, { useState } from 'react';
import { SearchResultTemplate } from '@/features/schedule/components/templates/searchResultTemplate';

const SearchTest: React.FC = () => {
  // 테스트용 데이터
  const [schedules] = useState([
    {
      id: '1',
      title: '프로젝트 미팅',
      startDate: '2024-03-20T10:00:00',
      endDate: '2024-03-20T12:00:00',
      description: '프로젝트 진행 상황 공유',
    },
    {
      id: '2',
      title: '코드 리뷰',
      startDate: '2024-03-21T14:00:00',
      endDate: '2024-03-21T16:00:00',
      description: '새로운 기능 코드 리뷰',
    },
    {
      id: '3',
      title: '팀 워크샵',
      startDate: '2024-03-22T09:00:00',
      endDate: '2024-03-22T18:00:00',
      description: '팀 빌딩 활동',
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">일정 검색 테스트</h1>
      <SearchResultTemplate schedules={schedules} />
    </div>
  );
};

export default SearchTest; 