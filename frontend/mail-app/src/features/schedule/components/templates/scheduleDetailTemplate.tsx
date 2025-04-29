import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Schedule } from '@/features/schedule/types/schedule';

interface ScheduleDetailTemplateProps {
  isEdit: boolean;
  initialData?: Schedule;
  onSave: (data: Schedule) => void;
  onClose: () => void;
  isOpen: boolean;
  isAnimating: boolean;
  onDelete?: () => void;
  isSubmitting?: boolean;
}

export const ScheduleDetailTemplate: React.FC<ScheduleDetailTemplateProps> = ({
  isEdit,
  initialData,
  onSave,
  onClose,
  isOpen,
  isAnimating,
}) => {
  const [schedule, setSchedule] = useState<Schedule>({
    id: '',
    title: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    description: '',
    userId: 'current-user-id'
  });

  useEffect(() => {
    if (initialData) {
      setSchedule(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(schedule);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className={`fixed inset-0 bg-gray-500 transition-opacity duration-300 ${
          isAnimating ? 'opacity-75' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      {/* 모달 컨테이너 */}
      <div 
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {isEdit ? '일정 수정' : '일정 등록'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                일정명
              </label>
              <input
                type="text"
                value={schedule.title}
                onChange={(e) => setSchedule({ ...schedule, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                시작 일시
              </label>
              <input
                type="datetime-local"
                value={format(new Date(schedule.startDate), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => setSchedule({ ...schedule, startDate: new Date(e.target.value).toISOString() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종료 일시
              </label>
              <input
                type="datetime-local"
                value={format(new Date(schedule.endDate), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => setSchedule({ ...schedule, endDate: new Date(e.target.value).toISOString() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                value={schedule.description}
                onChange={(e) => setSchedule({ ...schedule, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {isEdit ? '수정' : '등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
