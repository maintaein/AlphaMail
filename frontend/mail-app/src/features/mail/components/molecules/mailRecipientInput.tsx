import React, { useState } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface MailRecipientInputProps {
  label: string;
  recipients: string[];
  onAddRecipient: (email: string) => void;
  onRemoveRecipient: (index: number) => void;
}

export const MailRecipientInput: React.FC<MailRecipientInputProps> = ({
  label,
  recipients,
  onAddRecipient,
  onRemoveRecipient
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddRecipient(inputValue.trim());
      setInputValue('');
      e.preventDefault();
    } else if (e.key === ';' || e.key === ',') {
      // 세미콜론이나 쉼표로도 이메일 추가 가능
      if (inputValue.trim()) {
        onAddRecipient(inputValue.trim());
        setInputValue('');
        e.preventDefault();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      onAddRecipient(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex items-start mb-2">
      <Typography variant="body" className="w-20 pt-1 text-sm">
        {label}:
      </Typography>
      <div className="flex-1 flex flex-wrap gap-1 items-center border-b border-gray-300 py-1">
        {recipients.map((recipient, index) => (
          <div 
            key={index} 
            className="flex items-center bg-[#CDECFC] px-2 py-0.5 rounded text-sm"
          >
            <span>{recipient}</span>
            <button 
              onClick={() => onRemoveRecipient(index)}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        ))}
        <input 
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={`${label} 추가...`}
          className="flex-1 outline-none min-w-[100px] text-sm h-5 py-0"
        />
      </div>
    </div>
  );
};