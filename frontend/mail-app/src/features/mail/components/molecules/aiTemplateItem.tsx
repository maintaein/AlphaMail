import React from 'react';

interface AiTemplateItemProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onLabelChange: (label: string) => void;
    onDelete?: () => void;
    showDeleteButton?: boolean;
  }

const AiTemplateItem: React.FC<AiTemplateItemProps> = ({ 
    label, 
    value, 
    onChange, 
    onLabelChange,
    onDelete,
    showDeleteButton = true
  }) => {
    return (
        <div className="bg-white rounded-lg p-2 pr-2 mb-2 border border-gray-200">
            <div className="flex items-center">
            <div className="w-24">
                <input
                type="text"
                value={label}
                onChange={(e) => onLabelChange && onLabelChange(e.target.value)}
                className="w-full outline-none text-sm font-bold text-gray-700"
                />
            </div>
            <div className="flex-1 border-l border-gray-200 pl-4">
                <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="내용을 입력해주세요"
                className="w-full outline-none text-sm text-gray-600"
                />
            </div>
            {showDeleteButton && onDelete && (
              <div className="ml-2">
                <button 
                  onClick={onDelete}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            </div>
        </div>
    );
};

export default AiTemplateItem;