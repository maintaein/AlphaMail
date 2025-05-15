import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface AiSummaryProps {
  aiResponse: string | null;
}

const AiSummary: React.FC<AiSummaryProps> = ({ aiResponse }) => {
  return (
    <div className="p-4">
      <Typography variant="titleSmall" bold className="mb-3">메일 요약</Typography>
      <div className="bg-blue-50 p-4 rounded-lg">
        <Typography variant="body" color="secondary">{aiResponse}</Typography>
      </div>
      
      <Typography variant="titleSmall" bold className="mt-6 mb-3">주요 키워드</Typography>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">학사경고</span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">리포트</span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">김태희</span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">4월 22일</span>
      </div>
      
      <Typography variant="titleSmall" bold className="mt-6 mb-3">추천 응답</Typography>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <Typography variant="body" color="secondary" className="mb-3">
          안녕하세요, 확인했습니다. 학사경고 리포트 관련하여 추가 문의사항이 있으면 알려주세요.
        </Typography>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
          응답에 사용하기
        </button>
      </div>
      
      {/* 더미 내용 추가 */}
      <Typography variant="titleSmall" bold className="mt-6 mb-3">추가 정보</Typography>
      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
        <Typography variant="body" color="secondary" className="mb-3">
          이 메일은 학사 관리 시스템에서 자동으로 발송된 것으로 보입니다. 학사경고는 해당 학기 평점이 2.0 미만인 경우 발생합니다.
        </Typography>
      </div>
      
      <Typography variant="titleSmall" bold className="mt-6 mb-3">관련 문서</Typography>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <ul className="list-disc pl-5">
          <li className="mb-2">학사경고 관련 규정 문서</li>
          <li className="mb-2">학사경고 해제 절차 안내</li>
          <li className="mb-2">학업 지원 프로그램 안내</li>
        </ul>
      </div>
      
      <Typography variant="titleSmall" bold className="mt-6 mb-3">이전 커뮤니케이션</Typography>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <Typography variant="body" color="secondary" className="mb-3">
          이전에 학사경고 관련 메일이 3월 15일에 발송된 기록이 있습니다. 해당 메일에는 중간고사 성적 경고에 대한 내용이 포함되어 있었습니다.
        </Typography>
      </div>
      
      <Typography variant="titleSmall" bold className="mt-6 mb-3">조치 사항</Typography>
      <div className="bg-green-50 p-4 rounded-lg mb-8">
        <Typography variant="body" color="secondary" className="mb-3">
          학사경고를 받은 학생은 다음 학기 수강신청 전에 지도교수와 상담이 필요합니다. 또한 학업 지원 프로그램 참여가 권장됩니다.
        </Typography>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">
          일정 예약하기
        </button>
      </div>
    </div>
  );
};

export default AiSummary;