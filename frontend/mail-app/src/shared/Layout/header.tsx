import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="w-full h-[70px] min-h-[70px] border-b border-[#DBD5D5] flex items-center px-6">
      <div className="flex-1 flex items-center justify-between">{children}</div>
      <div className="w-10 h-10 rounded-full bg-[#B1B1B1] ml-6">
        {/* 프로필 이미지가 있다면 아래 주석을 해제하고 사용 */}
        {/* <img src="/profile.png" alt="프로필" className="w-full h-full rounded-full object-cover" /> */}
      </div>
    </header>
  );
};