import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MailDetailHeader } from '../organisms/mailDetailHeader';
import { MailMetadata } from '../organisms/mailMetadata';
import { AttachmentList } from '../organisms/attachmentList';
import { MailContent } from '../organisms/mailContent';
import { MailThreadList } from '../organisms/mailThread';
import { useMail } from '../../hooks/useMail';
import { Spinner } from '@/shared/components/atoms/spinner';
import { Typography } from '@/shared/components/atoms/Typography';
import { useHeaderStore } from '@/shared/stores/useHeaderStore';
import { useQuery } from '@tanstack/react-query';
import { mailService } from '../../services/mailService';
import { MailDetailResponse } from '../../types/mail';

interface MailDetailTemplateProps {
  source?: 'inbox' | 'sent' | 'trash';
}

const MailDetailTemplate: React.FC<MailDetailTemplateProps> = ({ source }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { useMailDetail, moveMailToTrash, downloadAttachment } = useMail();
  const { setTitle } = useHeaderStore();
  const [threadMails, setThreadMails] = useState<MailDetailResponse[]>([]);

  // URL 경로에서 source 결정 (props가 없는 경우)
  const determineSource = (): 'inbox' | 'sent' | 'trash' => {
    if (source) return source;
    if (location.pathname.includes('/mail/sent/')) return 'sent';
    if (location.pathname.includes('/mail/trash/')) return 'trash';
    return 'inbox';
  };

  const currentSource = determineSource();

  // 출처에 따라 헤더 타이틀 설정
  useEffect(() => {
    switch (currentSource) {
      case 'sent':
        setTitle('보낸 메일함');
        break;
      case 'trash':
        setTitle('휴지통');
        break;
      default:
        setTitle('받은 메일함');
    }
    
    // 컴포넌트 언마운트 시 타이틀 초기화 (선택사항)
    return () => {
      setTitle('');
    };
  }, [currentSource, setTitle]);
  
  // 메일 상세 정보 조회
  const { data, isLoading, isError, error } = useMailDetail(id || '');
  
  // 스레드 메일 목록 조회
  const { data: threadData } = useQuery({
    queryKey: ['mailThread', data?.subject, data?.sender, data?.recipients?.join(',')],
    queryFn: async () => {
      if (!data || !id) return [];
      
      try {
        console.log('현재 메일 정보:', {
          id: data.id,
          subject: data.subject,
          sender: data.sender,
          recipients: data.recipients
        });
        
        // 제목에서 RE: 접두사 제거
        const baseSubject = data.subject.replace(/^RE:\s*/i, '').trim();
        
        // 받은 메일함과 보낸 메일함에서 메일 목록 조회
        const [inboxResponse, sentResponse] = await Promise.all([
          mailService.getMailList(1, 1, 50, 0),
          mailService.getMailList(2, 1, 50, 0)
        ]);
        
        // 모든 메일 ID 추출
        const allMailIds = [
          ...inboxResponse.emails.map(mail => mail.id),
          ...sentResponse.emails.map(mail => mail.id)
        ];
        
        // 각 메일의 상세 정보 조회
        const mailDetails = await Promise.all(
          allMailIds.map(mailId => mailService.getMailDetail(mailId))
        );
        
        // 같은 주제와 발신자/수신자를 가진 메일 필터링
        const threadMails = mailDetails.filter(mail => {
          // 제목에서 RE: 접두사 제거
          const mailBaseSubject = mail.subject.replace(/^RE:\s*/i, '').trim();
          
          // 제목이 같고
          const isSameSubject = mailBaseSubject === baseSubject;
          
          // 발신자가 현재 메일의 발신자이거나 수신자 중 하나인 경우
          const isSameSender = mail.sender === data.sender || 
                              data.recipients.includes(mail.sender);
          
          // 수신자 중 하나가 현재 메일의 발신자인 경우
          const isSameRecipient = mail.recipients.some(recipient => 
            recipient === data.sender || data.recipients.includes(recipient)
          );
          
          return isSameSubject && (isSameSender || isSameRecipient);
        });
        
        // 현재 메일이 포함되어 있지 않으면 추가
        if (!threadMails.some(mail => mail.id === Number(id))) {
          threadMails.push(data);
        }
        
        // 시간순 정렬
        const result = threadMails.sort((a, b) => {
          const dateA = new Date(a.emailType === 'RECEIVED' ? a.receivedDateTime : a.sentDateTime);
          const dateB = new Date(b.emailType === 'RECEIVED' ? b.receivedDateTime : b.sentDateTime);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log('스레드 메일 조회 결과:', result);
        return result;
      } catch (error) {
        console.error('스레드 메일 조회 오류:', error);
        return [data]; // 오류 발생 시 현재 메일만 반환
      }
    },
    enabled: !!data,
  });

  // threadData가 변경될 때 상태 업데이트
  useEffect(() => {
    if (threadData) {
      console.log('스레드 데이터 상태 업데이트:', threadData);
      setThreadMails(threadData);
    }
  }, [threadData]);

  // 스레드 목록 렌더링 전에 확인
  useEffect(() => {
    console.log('현재 스레드 메일 상태:', threadMails);
  }, [threadMails]);


  // 뒤로 가기 처리 - 출처에 따라 다른 경로로 이동
  const handleBack = () => {
    switch (currentSource) {
      case 'sent':
        navigate('/mail/sent');
        break;
      case 'trash':
        navigate('/mail/trash');
        break;
      default:
        navigate('/mail');
    }
  };
  
  // 답장 처리
  const handleReply = () => {
    if (id) {
      navigate(`/mail/write?reply=${id}`);
    }
  };
    
  const handleDelete = () => {
    if (id) {
      moveMailToTrash.mutate({ 
        mailId: id 
      }, {
        onSuccess: () => {
          // 출처에 따라 다른 경로로 이동
          switch (currentSource) {
            case 'sent':
              navigate('/mail/sent');
              break;
            case 'trash':
              navigate('/mail/trash');
              break;
            default:
              navigate('/mail');
          }
        }
      });
    }
  };
  
  // 첨부 파일 다운로드 처리
  const handleDownload = (attachmentId: number, fileName: string) => {
    if (!id) return;
    
    downloadAttachment.mutate({
      mailId: Number(id),
      attachmentId,
      fileName
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="large" />
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Typography variant="titleLarge" className="text-red-500 mb-2">
          메일을 불러오는 중 오류가 발생했습니다.
        </Typography>
        <Typography variant="body">
          {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
        </Typography>
        <button 
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          뒤로 가기
        </button>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Typography variant="titleLarge" className="mb-2">
          메일을 찾을 수 없습니다.
        </Typography>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  const displayDate = data.emailType === 'SENT' ? data.sentDateTime : data.receivedDateTime;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow overflow-auto">
      {/* 메일 상세 헤더 */}
      <MailDetailHeader
        onBack={handleBack}
        onReply={handleReply}
        onDelete={handleDelete}
        source={currentSource}
      />

      {/* 메일 메타데이터 (제목, 발신자, 수신자, 날짜) */}
      <MailMetadata
        subject={data.subject}
        sender={data.sender}
        recipients={data.recipients}
        receivedDateTime={displayDate}
        onAiAssistant={() => console.log('AI 어시스턴트 실행')}
        onTranslate={() => console.log('번역 실행')}      
      />
      
      {/* 첨부 파일 목록 */}
      {data.attachments && data.attachments.length > 0 && (
        <AttachmentList
          attachments={data.attachments}
          onDownload={handleDownload}
        />
      )}
      
      {/* 메일 본문 */}
      <div className="flex-grow">
        <MailContent
          bodyHtml={data.bodyHtml}
          bodyText={data.bodyText}
        />
      </div>
      
      {/* 스레드 메일 목록 */}
      {threadMails.length > 1 ? (
        <MailThreadList 
          currentMailId={Number(id)}
          threadMails={threadMails}
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <Typography variant="body">
            스레드 메일이 없습니다.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MailDetailTemplate;