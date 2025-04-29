import React from 'react';
import { SearchListGrid } from '../organisms/searchListGrid';

interface SearchResultTemplateProps {
  schedules: Array<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    userId: string;
  }>;
  isLoading?: boolean;
  error?: Error | null;
}

export const SearchResultTemplate: React.FC<SearchResultTemplateProps> = ({
  schedules,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">검색 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">검색 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          검색 결과 ({schedules.length}건)
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <SearchListGrid schedules={schedules} />
      </div>
    </div>
  );
};
