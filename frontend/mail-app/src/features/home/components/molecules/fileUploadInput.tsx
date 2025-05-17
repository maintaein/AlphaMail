import React, { useRef } from 'react';
import { Input } from '@/shared/components/atoms/input';
import { Button } from '@/shared/components/atoms/button';

interface FileUploadInputProps {
  value: string;
  onChange: (file: File | null) => void;
  className?: string;
  placeholder?: string;
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  value,
  onChange,
  className,
  placeholder = '파일을 선택하세요'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="flex w-full">
      <Input
        type="text"
        value={value}
        readOnly
        placeholder={placeholder}
        className={`flex-grow ${className}`}
        onClick={handleClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <Button
        variant="secondary"
        size="small"
        onClick={handleClick}
        className="ml-2"
      >
        찾아보기
      </Button>
    </div>
  );
};