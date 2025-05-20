import React, { useMemo } from 'react';
import { Schedule } from '@/features/schedule/types/schedule';
import { format, isSameDay } from 'date-fns';

interface ScheduleDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: Schedule[];
  onEventClick?: (event: Schedule) => void;
}

export const ScheduleDayModal: React.FC<ScheduleDayModalProps> = ({
  isOpen,
  onClose,
  date,
  events,
  onEventClick,
}) => {
  if (!isOpen) return null;
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'HH:mm');
  };
  
  // 날짜 범위 포맷 (5/19~5/24 형식으로)
  const formatDateRange = (startDate: Date, endDate: Date) => {
    // 같은 날짜면 단일 날짜만 표시
    if (isSameDay(startDate, endDate)) {
      return format(startDate, 'M/d');
    }
    
    // 다른 날짜면 범위 표시
    return `${format(startDate, 'M/d')}~${format(endDate, 'M/d')}`;
  };
  
  // 완료된 일정과 진행 중인 일정 분리
  const { completedEvents, inProgressEvents } = useMemo(() => {
    const completed = events.filter(event => event.is_done);
    const inProgress = events.filter(event => !event.is_done);
    return { completedEvents: completed, inProgressEvents: inProgress };
  }, [events]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300 scale-100">
        {/* 모달 헤더 */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {format(date, 'yyyy년 MM월 dd일')} 일정
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              총 {events.length}개 | 완료 {completedEvents.length}/{events.length}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 모달 본문 */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">이 날짜에 일정이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* 진행 중인 일정 섹션 */}
              {inProgressEvents.length > 0 && (
                <div className="py-2 px-4 bg-blue-50">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">진행 중인 일정 ({inProgressEvents.length})</h4>
                </div>
              )}
              
              {inProgressEvents.map((event, idx) => {
                const startDate = new Date(event.start_time);
                const endDate = new Date(event.end_time);
                
                return (
                  <div 
                    key={`modal-active-event-${idx}`}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-start"
                    onClick={() => {
                      onEventClick?.(event);
                      onClose();
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {event.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {formatDateRange(startDate, endDate)}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">시작: {formatTime(event.start_time.toISOString())}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                      진행중
                    </span>
                  </div>
                );
              })}
              
              {/* 완료된 일정 섹션 */}
              {completedEvents.length > 0 && (
                <div className="py-2 px-4 bg-green-50">
                  <h4 className="text-sm font-medium text-green-700 mb-2">완료된 일정 ({completedEvents.length})</h4>
                </div>
              )}
              
              {completedEvents.map((event, idx) => {
                const startDate = new Date(event.start_time);
                const endDate = new Date(event.end_time);
                
                return (
                  <div 
                    key={`modal-completed-event-${idx}`}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-start"
                    onClick={() => {
                      onEventClick?.(event);
                      onClose();
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-700 line-through">
                        {event.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {formatDateRange(startDate, endDate)}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">시작: {formatTime(event.start_time.toISOString())}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                      완료
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
        
        {/* 모달 푸터 */}
        <div className="p-4 bg-gray-50 flex justify-end">
        
        </div>
      </div>
    </div>
  );
};