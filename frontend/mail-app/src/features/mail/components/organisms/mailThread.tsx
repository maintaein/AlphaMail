import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MailDetailResponse } from '../../types/mail';
import './mailThread.css';  // CSS 파일 import
import { Typography } from '@/shared/components/atoms/Typography';
import { FaInbox, FaPaperPlane } from 'react-icons/fa';

interface MailThreadListProps {
  currentMailId: number;
  threadMails: MailDetailResponse[];
}

export const MailThreadList: React.FC<MailThreadListProps> = ({ 
  currentMailId, 
  threadMails 
}) => {
  const navigate = useNavigate();

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    return isToday 
      ? format(date, 'a h:mm', { locale: ko }) 
      : format(date, 'yyyy.MM.dd', { locale: ko });
  };

  // 메일 클릭 핸들러
  const handleMailClick = (mailId: number) => {
    const clickedMail = threadMails.find(mail => mail.id === mailId);
    
    if (clickedMail?.emailType === 'SENT') {
      navigate(`/mail/sent/${mailId}`);
    } else {
      navigate(`/mail/${mailId}`);
    }
  };
  
  return (
    <div className="mt-6 border-t border-gray-200 p-6">
      <div className="flex items-center mb-3 pl-6">
        <Typography variant="titleSmall" bold className="text-gray-700">
          주고 받은 메일 
        </Typography>
        <Typography variant="titleSmall" bold className="text-blue-400 ml-1">
          {threadMails.length}
        </Typography>
      </div>      
      <div className="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden p-6">
        {threadMails.map((mail) => (
          <div 
            key={mail.id}
            className={`flex items-center p-4 mb-2 rounded-lg border border-gray-100 last:mb-0 cursor-pointer hover:bg-blue-50 transition-colors
              ${mail.id === currentMailId ? 'bg-blue-100' : 'bg-white'}`}
            onClick={() => mail.id !== currentMailId && handleMailClick(mail.id)}
          >
            <div className="flex-shrink-0 w-8 mr-3 text-center">
              {mail.emailType === 'RECEIVED' ? (
                <FaInbox className="text-blue-400 w-5 h-5 mx-auto" title="받은 메일" />
              ) : (
                <FaPaperPlane className="text-blue-400 w-5 h-5 mx-auto" title="보낸 메일" />
              )}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center">
                <Typography 
                  variant="body" 
                  bold 
                  className="truncate mr-2"
                >
                  {mail.emailType === 'RECEIVED' ? mail.sender.split('<')[0].trim() : '나'}
                </Typography>
                <Typography 
                  variant="caption" 
                  className="text-gray-500"
                >
                  {formatDate(mail.emailType === 'RECEIVED' ? mail.receivedDateTime : mail.sentDateTime)}
                </Typography>
              </div>
              <Typography 
                variant="body" 
                className="text-gray-600 truncate"
              >
                {mail.subject}
              </Typography>
            </div>
            {mail.hasAttachments && (
              <div className="flex-shrink-0 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};