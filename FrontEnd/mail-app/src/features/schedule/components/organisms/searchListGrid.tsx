import React from 'react';
import { SearchListRow } from '../molecules/searchListRow';

interface SearchListGridProps {
  schedules: Array<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    userId: string;
  }>;
}

export const SearchListGrid: React.FC<SearchListGridProps> = ({ schedules }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              시작일
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              종료일
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              일정명
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedules.map((schedule) => (
            <SearchListRow key={schedule.id} schedule={schedule} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
