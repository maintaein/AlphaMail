import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';
import { Typography } from '@/shared/components/atoms/Typography';

export const NavBar = () => {
  const location = useLocation();
  
  // 현재 경로에 따라 활성화된 메뉴 스타일 적용
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    
    <div className="h-screen w-[200px] bg-[#66BAE4] flex flex-col">
      {/* 로고 영역 */}
      <div className="py-2"></div>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-16 h-16">
            <img src="/logo.png" alt="ALPHAMAIL 로고" className="w-full h-full" />
        </div>
        <div className="text-white text-xl mt-2 font-light">ALPHAMAIL</div>
      </div>

      <div className="py-4"></div>

      {/* 메뉴 영역 */}
      <nav className="flex-1">
        <ul className="px-2">
          <li className="my-1">
            <Link to="/">
              <div className={cn(
                "flex items-center py-3 px-4 text-white rounded-lg transition-colors",
                isActive('/') ? "bg-[#3E99C6]" : "hover:bg-[#3E99C6]"
              )}>
                <img src="/home.png" alt="홈" className="w-5 h-5 mr-2" />
                <Typography variant="titleSmall" color="text-white">홈</Typography>

              </div>
            </Link>
          </li>
          <li className="my-1">
            <Link to="/mail">
              <div className={cn(
                "flex items-center py-3 px-4 text-white rounded-lg transition-colors",
                isActive('/mail') ? "bg-[#3E99C6]" : "hover:bg-[#3E99C6]"
              )}>
                <img src="/mail_outline.png" alt="메일" className="w-5 h-5 mr-2" />
                <Typography variant="titleSmall" color="text-white">메일</Typography>
              </div>
            </Link>
          </li>
          <li className="my-1">
            <Link to="/schedule">
              <div className={cn(
                "flex items-center py-3 px-4 text-white rounded-lg transition-colors",
                isActive('/schedule') ? "bg-[#3E99C6]" : "hover:bg-[#3E99C6]"
              )}>
                <img src="/date_range.png" alt="일정" className="w-5 h-5 mr-2" />
                <Typography variant="titleSmall" color="text-white">일정</Typography>
              </div>
            </Link>
          </li>
          <li className="my-1">
            <Link to="/work">
              <div className={cn(
                "flex items-center py-3 px-4 text-white rounded-lg transition-colors",
                isActive('/work') ? "bg-[#3E99C6]" : "hover:bg-[#3E99C6]"
              )}>
                <img src="/business_center.png" alt="work+" className="w-5 h-5 mr-2" />
                <Typography variant="titleSmall" color="text-white">work+</Typography>
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* 로그아웃 버튼 */}
      <div className="p-4">
        <button className="w-full py-3 text-white border border-white rounded-md hover:bg-[#3E99C6] transition-colors">
        <Typography variant="titleSmall" color="text-white">로그아웃</Typography>
        </button>
      </div>
    </div>
  );
};
