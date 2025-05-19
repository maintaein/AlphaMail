import React, { forwardRef } from 'react';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const formatPhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/\D/g, '');

  if (numbersOnly.startsWith('02')) {
    // 서울 지역번호
    if (numbersOnly.length <= 2) return numbersOnly;
    if (numbersOnly.length <= 5) return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2)}`;
    if (numbersOnly.length <= 9)
      return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 5)}-${numbersOnly.slice(5)}`;
    return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 6)}-${numbersOnly.slice(6, 10)}`;
  } else {
    // 휴대폰 또는 일반 지역번호 (3자리)
    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 6)
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    if (numbersOnly.length <= 10)
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 6)}-${numbersOnly.slice(6)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  }
};

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, name, maxLength = 13, errorMessage, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: formatted,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    };

    return (
      <div>
        <input
          ref={ref}
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className="w-full h-[32px] px-2 border border-gray-300 bg-white text-sm focus:outline-none"
          {...rest}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput'; 