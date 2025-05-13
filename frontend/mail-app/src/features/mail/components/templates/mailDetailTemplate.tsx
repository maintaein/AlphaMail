import React, { useEffect } from 'react';
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

interface MailDetailTemplateProps {
  source?: 'inbox' | 'sent' | 'trash';
}

const MailDetailTemplate: React.FC<MailDetailTemplateProps> = ({ source }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { useMailDetail, moveMailToTrash, downloadAttachment } = useMail();
  const { setTitle } = useHeaderStore();

  // 메일 상세 정보 조회
  const { data, isLoading, isError, error } = useMailDetail(id || '');
  
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
  
  // 답장 핸들러
  const handleReply = () => {
    if (!data) return;
    
    // 제목에 RE: 접두사 추가 (이미 있으면 추가하지 않음)
    const subject = data.subject.startsWith('RE:') ? data.subject : `RE: ${data.subject}`;
    
    navigate('/mail/write', {
      state: {
        to: [data.sender],
        subject,
        inReplyTo: data.messageId, // messageId를 inReplyTo로 사용
        references: data.references || [], // references 그대로 전달
        threadId: data.threadId
      }
    });
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
      {data.threadEmails && data.threadEmails.length > 1 && (
        <MailThreadList
          currentMailId={Number(id)}
          threadMails={data.threadEmails}
        />
      )}
    </div>
  );
};

export default MailDetailTemplate;