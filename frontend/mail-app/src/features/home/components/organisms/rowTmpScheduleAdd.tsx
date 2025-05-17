import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { Input } from '@/shared/components/atoms/input';
import { Button } from '@/shared/components/atoms/button';
import { TmpScheduleDate } from '../molecules/tmpScheduleDate';
import { useHomeStore } from '../../stores/useHomeStore';

export const RowTmpScheduleAdd: React.FC = () => {
  const { 
    schedule, 
    scheduleErrors,
    setScheduleTitle,
    setScheduleDescription,
    validateSchedule,
    resetSchedule
  } = useHomeStore();

  const handleApply = () => {
    if (validateSchedule()) {
      // 여기서 일정 저장 로직 구현
      console.log('일정 저장:', schedule);
      resetSchedule();
    }
  };

  const handleTempSave = () => {
    if (validateSchedule()) {
      // 여기서 임시 저장 로직 
      console.log('임시 저장:', schedule);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4 bg-white rounded-md p-4">
      <div className="mb-4">
        <Typography variant="titleMedium" className="font-medium mb-4">
          일정
        </Typography>
        
        <div className="mb-4">
          <Typography variant="titleSmall" className="text-gray-700 mb-1 flex items-center">
            일정명 <span className="text-red-500 ml-1">*</span>
          </Typography>
          <Input 
            value={schedule.title}
            onChange={(e) => setScheduleTitle(e.target.value)}
            placeholder="일정명을 입력하세요"
            size="medium"
            maxLength={50}
          />
          {scheduleErrors.title && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {scheduleErrors.title}
            </Typography>
          )}
          <Typography variant="caption" className="text-gray-500 mt-1">
            {schedule.title.length}/50자
          </Typography>
        </div>
        
        <TmpScheduleDate />
        
        <div className="mb-4">
          <Typography variant="titleSmall" className="text-gray-700 mb-1">
            설명
          </Typography>
          <textarea
            value={schedule.description}
            onChange={(e) => setScheduleDescription(e.target.value)}
            placeholder="일정에 대한 설명을 입력하세요"
            className="border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary w-full p-3 text-sm h-24 resize-none"
            maxLength={100}
          />
          {scheduleErrors.description && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {scheduleErrors.description}
            </Typography>
          )}
          <Typography variant="caption" className="text-gray-500 mt-1">
            {schedule.description.length}/100자
          </Typography>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" size="small" onClick={handleTempSave}>
            임시저장
          </Button>
          <Button variant="primary" size="small" onClick={handleApply}>
            적용
          </Button>
        </div>
      </div>
    </div>
  );
};