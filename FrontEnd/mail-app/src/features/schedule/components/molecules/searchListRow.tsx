import React from 'react';
import { ScheduleDetailTemplate } from '../templates/scheduleDetailTemplate';
import { useModal } from '@/hooks/useModal';

interface SearchListRowProps {
  schedule: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
  };
}

export const SearchListRow: React.FC<SearchListRowProps> = ({ schedule }) => {
  const { isOpen, isAnimating, openModal, closeModal } = useModal();

  const handleTitleClick = () => {
    openModal();
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(schedule.startDate).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(schedule.endDate).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={handleTitleClick}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {schedule.title}
          </button>
        </td>
      </tr>

      <ScheduleDetailTemplate
        isEdit={true}
        initialData={schedule}
        onSave={() => {}}
        onClose={closeModal}
        isOpen={isOpen}
        isAnimating={isAnimating}
      />
    </>
  );
};
