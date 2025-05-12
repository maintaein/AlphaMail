import React from 'react';
import { format, isSameDay } from 'date-fns';
import { useScheduleSearch } from '../../hooks/useScheduleSearch';
import { useScheduleStore } from '../../stores/useScheduleStore';
import { useModalStore } from '@/shared/stores/useModalStore';
import { ScheduleDetailTemplate } from './scheduleDetailTemplate';
import { Typography } from '@/shared/components/atoms/Typography';
import { useScheduleSearchStore } from '@/shared/stores/useSearchBar';
import { FaArrowLeft } from 'react-icons/fa';

export const ScheduleSearchTemplate: React.FC = () => {
    const { isOpen, isAnimating, openModal, closeModal } = useModalStore();
    const { setSelectedSchedule, setIsEdit } = useScheduleStore();
    const { searchKeyword, currentPage, setCurrentPage, setIsSearchMode, setSearchKeyword } = useScheduleSearchStore();
    const { data, isLoading, error } = useScheduleSearch();
  
  const handleScheduleClick = (scheduleId: string) => {
    const schedule = data?.data.find(s => s.id === scheduleId);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsEdit(true);
      openModal();
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

    // 메인 페이지로 돌아가는 함수
    const handleBackToMain = () => {
        setIsSearchMode(false);
        setSearchKeyword('');
        };
    
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

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
            <button 
              onClick={handleBackToMain}
              className="mr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              title="일정 메인으로 돌아가기"
            >
              <FaArrowLeft size={18} />
            </button>
            <Typography variant="titleMedium">
              "{searchKeyword}" 검색 결과 ({data.totalCount}건)
            </Typography>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  등록일자
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기간
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  일정명
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {data.data.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(schedule.created_at, 'yyyy-MM-dd')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(schedule.start_time, 'M월 d일 ')} 
                        {isSameDay(schedule.start_time, schedule.end_time) 
                            ? `${format(schedule.start_time, 'HH:mm')} ~ ${format(schedule.end_time, 'HH:mm')}`
                            : `${format(schedule.start_time, 'HH:mm')} ~ ${format(schedule.end_time, 'M월 d일 HH:mm')}`
                        }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                        onClick={() => handleScheduleClick(schedule.id)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                        {schedule.name}
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 페이지네이션 */}
      {data.pageCount > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              이전
            </button>
            {Array.from({ length: data.pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-3 py-1 border border-gray-300 text-sm font-medium ${
                  i === currentPage
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(data.pageCount - 1, currentPage + 1))}
              disabled={currentPage === data.pageCount - 1}
              className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              다음
            </button>
          </nav>
        </div>
      )}

      <ScheduleDetailTemplate
        onClose={closeModal}
        isOpen={isOpen}
        isAnimating={isAnimating}
      />
    </div>
  );
};