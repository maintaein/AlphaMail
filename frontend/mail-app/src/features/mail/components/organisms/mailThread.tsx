import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import './mailThread.css';  // CSS 파일 import
import { Typography } from '@/shared/components/atoms/Typography';
import { FaInbox, FaPaperPlane } from 'react-icons/fa';

interface ThreadMail {
    emailId: number;
    sender: string;
    subject: string;
    dateTime: string;
    originalFolderId: number;
}
  
interface MailThreadListProps {
    currentMailId: number;
    threadMails: ThreadMail[];
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
  
  // 폴더 ID에 따른 경로 결정
  const getMailPath = (mail: ThreadMail) => {
    switch (mail.originalFolderId) {
      case 1: return `/mail/${mail.emailId}`;
      case 2: return `/mail/sent/${mail.emailId}`;
      default: return `/mail/${mail.emailId}`;
    }
  };

  // 메일 클릭 핸들러
  const handleMailClick = (mail: ThreadMail) => {
    navigate(getMailPath(mail));
  };
  
  if (!threadMails || threadMails.length <= 1) return null;

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
            key={mail.emailId}
            className={`flex items-center p-4 mb-2 rounded-lg border border-gray-100 last:mb-0 cursor-pointer hover:bg-blue-50 transition-colors
              ${mail.emailId === currentMailId ? 'bg-blue-100' : 'bg-white'}`}
            onClick={() => mail.emailId !== currentMailId && handleMailClick(mail)}
          >
            <div className="flex-shrink-0 w-8 mr-3 text-center">
              {/* 폴더 ID로 메일 타입 추정 */}
              {mail.originalFolderId === 1 ? (
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
                  {mail.originalFolderId === 1 ? mail.sender.split('<')[0].trim() : '나'}
                </Typography>
                <Typography 
                  variant="caption" 
                  className="text-gray-500"
                >
                  {formatDate(mail.dateTime)}
                </Typography>
              </div>
              <Typography 
                variant="body" 
                className="text-gray-600 truncate"
              >
                {mail.subject}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};