import React from 'react';
// import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MailDetailHeader } from '../organisms/mailDetailHeader';
import { MailMetadata } from '../organisms/mailMetadata';
import { AttachmentList } from '../organisms/attachmentList';
import { MailContent } from '../organisms/mailContent';
import { useMail } from '../../hooks/useMail';
import { Spinner } from '@/shared/components/atoms/spinner';
import { Typography } from '@/shared/components/atoms/Typography';

const MailDetailTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { useMailDetail, moveMailToTrash } = useMail();
//   const {markAsRead} = useMail();

  // 메일 상세 정보 조회
  const { data, isLoading, isError, error } = useMailDetail(id || '');
  
// //   메일을 읽음 상태로 변경
//   useEffect(() => {
//     if (id && data && !data.readStatus) {
//       markAsRead.mutate([id]);
//     }
//   }, [id, data, markAsRead]);
  
  // 뒤로 가기 처리
  const handleBack = () => {
    navigate(-1);
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
          navigate(`/mail`);
        }
      });
    }
  };
  
  // 첨부 파일 다운로드 처리
  const handleDownload = (attachmentId: number, fileName: string) => {
    // 첨부 파일 다운로드 로직
    // 실제 구현에서는 API 호출하여 파일 다운로드
    console.log(`Downloading attachment: ${fileName} (ID: ${attachmentId})`);
    
    // 예시: 다운로드 API 호출
    // window.open(`/api/mails/${id}/attachments/${attachmentId}/download`, '_blank');
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
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      {/* 메일 상세 헤더 */}
      <MailDetailHeader
        onBack={handleBack}
        onReply={handleReply}
        onDelete={handleDelete}
      />
      
      {/* 메일 메타데이터 (제목, 발신자, 수신자, 날짜) */}
      <MailMetadata
        subject={data.subject}
        sender={data.sender}
        recipients={data.recipients}
        receivedDate={data.receivedDate}
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
      <MailContent
        bodyHtml={data.bodyHtml}
        bodyText={data.bodyText}
      />
    </div>
  );
};

export default MailDetailTemplate;