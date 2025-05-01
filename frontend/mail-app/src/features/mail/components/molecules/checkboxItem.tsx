import React from 'react';

interface CheckboxItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ checked, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="flex items-center justify-center w-5 h-5">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="w-4 h-4 cursor-pointer accent-[#3E99C6]"
      />
    </div>
  );
};