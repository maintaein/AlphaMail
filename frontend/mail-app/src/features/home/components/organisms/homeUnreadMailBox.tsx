import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { useUnreadMails } from '@/features/home/hooks/useUnreadMails';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/shared/lib/queryClient';
import { ArrowPathIcon as RefreshIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

export const HomeUnreadMailBox: React.FC = () => {
  const { data: unreadMailsData, isLoading, error } = useUnreadMails(10);
  // readStatus가 false인 메일만 필터링
  const unreadMails = unreadMailsData?.data 
    ? unreadMailsData.data.filter(mail => mail.readStatus === false) 
    : [];
  
  // 필터링된 메일 수를 totalCount로 사용
  const totalCount = unreadMails.length;
  
  const navigate = useNavigate();
  
  // 메일 상세 페이지로 이동
  const handleMailClick = (mailId: string) => {
    navigate(`/mail/${mailId}`);
  };
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yy-MM-dd HH:mm', { locale: ko });
  };

  
  const refreshData = () => {
    // 토스트 알림 표시
    toast.info('안읽은 메일 목록을 새로고침합니다.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    // 쿼리 무효화 및 새로고침
    queryClient.invalidateQueries({ 
      queryKey: ['mails', 'unread'],
      refetchType: 'all'
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="titleMedium">안읽은 메일 {totalCount}건</Typography>
        <button 
          onClick={refreshData}
          className="text-gray-500 hover:text-blue-500"
          title="새로고침"
        >
          <RefreshIcon className="h-5 w-5" />
      </button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-4">
          <Typography variant="body">로딩 중...</Typography>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          <Typography variant="body">메일을 불러오는데 실패했습니다.</Typography>
        </div>
      ) : unreadMails.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          <Typography variant="body">안읽은 메일이 없습니다.</Typography>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] border border-gray-200 p-3 rounded-md overflow-y-auto">
          {unreadMails.map((mail) => (
            <div 
              key={mail.id} 
              className="border-b border-gray-100 pb-3 cursor-pointer hover:bg-gray-50"
              onClick={() => handleMailClick(mail.id.toString())}
            >
              <Typography variant="body" className="font-medium">
                {mail.sender || '발신자 없음'}
              </Typography>
              <Typography variant="caption" className="text-gray-600 truncate block">
                {mail.subject || '(제목 없음)'}
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                {formatDate(mail.receivedDateTime)}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};