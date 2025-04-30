import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Schedule } from '@/features/schedule/types/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleService } from '@/features/schedule/services/scheduleService';

interface ValidationErrors {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

interface ScheduleDetailTemplateProps {
  isEdit: boolean;
  initialData?: Schedule;
  onClose: () => void;
  isOpen: boolean;
  isAnimating: boolean;
  onDelete?: () => void;
}

export const ScheduleDetailTemplate: React.FC<ScheduleDetailTemplateProps> = ({
  isEdit,
  initialData,
  onClose,
  isOpen,
  isAnimating,
}) => {
  const queryClient = useQueryClient();
  const [schedule, setSchedule] = useState<Schedule>({
    id: '',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    userId: 'current-user-id'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const validateSchedule = (schedule: Schedule): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    const now = new Date();

    if (!schedule.title) {
      newErrors.title = '일정명을 입력해주세요.';
    } else if (schedule.title.length > 20) {
      newErrors.title = '일정명은 20자 이내로 입력해주세요.';
    }

    if (schedule.description && schedule.description.length > 50) {
      newErrors.description = '일정 메모는 50자 이내로 입력해주세요.';
    }

    if (!schedule.startDate) {
      newErrors.startDate = '시작 일시를 선택해주세요.';
    } else if (schedule.startDate < now) {
      newErrors.startDate = '시작 일시는 현재 시간보다 이후여야 합니다.';
    }

    if (!schedule.endDate) {
      newErrors.endDate = '종료 일시를 선택해주세요.';
    } else if (schedule.endDate <= schedule.startDate) {
      newErrors.endDate = '종료 일시는 시작 일시보다 이후여야 합니다.';
    }

    return newErrors;
  };

  const createMutation = useMutation({
    mutationFn: scheduleService.createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      onClose();
    }
  });

  const updateMutation = useMutation({
    mutationFn: scheduleService.updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      onClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: scheduleService.deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      onClose();
    }
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setSchedule(initialData);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSchedule(schedule);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (isEdit) {
        updateMutation.mutate(schedule);
      } else {
        createMutation.mutate(schedule);
      }
    }
  };

  const handleDelete = () => {
    if (schedule.id) {
      deleteMutation.mutate(schedule.id);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (!isOpen && !isAnimating) return null;

  return (
    <>
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
              <div className="flex items-center space-x-2">
                {isEdit && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    삭제
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
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
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  시작 일시
                </label>
                <input
                  type="datetime-local"
                  value={format(new Date(schedule.startDate), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setSchedule({ ...schedule, startDate: new Date(e.target.value) })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종료 일시
                </label>
                <input
                  type="datetime-local"
                  value={format(new Date(schedule.endDate), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setSchedule({ ...schedule, endDate: new Date(e.target.value) })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  value={schedule.description}
                  onChange={(e) => setSchedule({ ...schedule, description: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              {isEdit && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isCompleted"
                    checked={schedule.isCompleted}
                    onChange={(e) => setSchedule({ ...schedule, isCompleted: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isCompleted" className="ml-2 block text-sm text-gray-700">
                    완료 여부
                  </label>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '처리중...' : (isEdit ? '수정' : '등록')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">일정 삭제</h3>
            <p className="text-gray-500 mb-6">정말로 이 일정을 삭제하시겠습니까?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
