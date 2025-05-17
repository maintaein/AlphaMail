import { HomeAiTemplate } from '@/features/home/components/templates/homeAiTemplate';
import { HomeScheduleBox } from '@/features/home/components/organisms/homeScheduleBox';
import { HomeUnreadMailBox } from '@/features/home/components/organisms/homeUnreadMailBox';

const HomePage = () => {
  return (
    <div className="p-8 bg-[#F6F7F7] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI 어시스턴트 (왼쪽 큰 박스) */}
        <div className="lg:col-span-2">
          <HomeAiTemplate />
        </div>
        
        {/* 오른쪽 컬럼 (오늘의 일정 + 안읽은 메일) */}
        <div className="flex flex-col gap-6">
          {/* 오늘의 일정 */}
          <div>
            <HomeScheduleBox />
          </div>
          
          {/* 안읽은 메일 */}
          <div>
            <HomeUnreadMailBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;