import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MailWriteHeader } from '../organisms/mailWriteHeader';
import { MailWriteForm } from '../organisms/mailWriteForm';
import { useMail } from '../../hooks/useMail';
import { SendMailRequest } from '../../types/mail';
import { Spinner } from '@/shared/components/atoms/spinner';

const MailWriteTemplate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { useMailDetail, sendMail } = useMail();
  
  const [to, setTo] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [attachments, setAttachments] = useState<Array<{attachments_id: number}>>([]);
  const [showLoading, setShowLoading] = useState(false);

  // URL 쿼리 파라미터 파싱
  const queryParams = new URLSearchParams(location.search);
  const replyToId = queryParams.get('reply');
  const forwardId = queryParams.get('forward');
  
  // 답장 또는 전달 메일 정보 가져오기
  const { data: originalMail } = useMailDetail(replyToId || forwardId || '');
  
  useEffect(() => {
    if (originalMail) {
      if (replyToId) {
        // 답장 모드
        setTo([originalMail.sender]);
        setSubject(`RE: ${originalMail.subject}`);
        
        // HTML 형식으로 원본 메일 내용 추가
        const replyContent = `
          <p></p>
          <p></p>
          <p>---------- 원본 메일 ----------</p>
          <p><strong>보낸 사람:</strong> ${originalMail.sender}</p>
          <p><strong>날짜:</strong> ${new Date(originalMail.receivedDate).toLocaleString()}</p>
          <p><strong>제목:</strong> ${originalMail.subject}</p>
          <p></p>
          ${originalMail.bodyHtml || `<p>${originalMail.bodyText}</p>`}
        `;
        setContent(replyContent);
      } else if (forwardId) {
        // 전달 모드
        setSubject(`FW: ${originalMail.subject}`);
        
        // HTML 형식으로 원본 메일 내용 추가
        const forwardContent = `
          <p></p>
          <p></p>
          <p>---------- 전달된 메일 ----------</p>
          <p><strong>보낸 사람:</strong> ${originalMail.sender}</p>
          <p><strong>날짜:</strong> ${new Date(originalMail.receivedDate).toLocaleString()}</p>
          <p><strong>제목:</strong> ${originalMail.subject}</p>
          <p></p>
          ${originalMail.bodyHtml || `<p>${originalMail.bodyText}</p>`}
        `;
        setContent(forwardContent);
      }
    }
  }, [originalMail, replyToId, forwardId]);
  
    // sendMail.isPending 상태가 변경될 때 로딩 상태 관리
    useEffect(() => {
    if (sendMail.isPending) {
        setShowLoading(true);
    } else if (!sendMail.isPending && showLoading) {
        // 최소 1초 동안 로딩 표시
        const timer = setTimeout(() => {
        setShowLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }
    }, [sendMail.isPending, showLoading]);

  const handleSend = () => {
    // 유효성 검사
    if (to.length === 0) {
        alert('받는 사람을 입력해주세요.');
        return;
      }
      
      if (!subject) {
        alert('제목을 입력해주세요.');
        return;
      }
  
    // 메일 전송 데이터 준비
    const mailData: SendMailRequest = {
        sender: 'current-user@example.com', // 실제 구현에서는 현재 사용자 이메일을 가져와야 함
        recipients: to,
        subject,
        bodyText: content.replace(/<[^>]*>/g, ''), // HTML 태그 제거한 텍스트 버전
        bodyHtml: content,
        attachments: attachments.length > 0 ? attachments : undefined,
        inReplyTo: replyToId ? Number(replyToId) : undefined,
        references: []
      };
  
    // 메일 전송 API 호출
    sendMail.mutate(mailData, {
        onSuccess: () => {
          console.log('메일이 성공적으로 전송되었습니다.');
          // 전송 후 목록으로 이동
          setTimeout(() => {
            navigate('/mail/result', { state: { status: 'success' } });
          }, 1000);
        },
        onError: (error: Error | { status?: number; statusCode?: number; message?: string }) => {
            console.error('메일 전송 실패:', error);
            // 로딩 상태를 1초 동안 유지한 후 결과 페이지로 이동
            setTimeout(() => {
              navigate('/mail/result', { 
                state: { 
                  status: 'error',
                  code: (error as { status?: number; statusCode?: number }).status || (error as { statusCode?: number }).statusCode || 500,
                  message: (error as { message?: string }).message || '메일 전송에 실패했습니다.'
                } 
              });
            }, 1000);
          }
        });
    };
  
    const handleAttachmentsChange = (newAttachments: Array<{attachments_id: number}>) => {
        setAttachments(newAttachments);
      };

  const handleCancel = () => {
    // 작성 취소 및 이전 페이지로 이동
    navigate(-1);
  };
  
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  
  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
  };
  
  const handleRecipientsChange = (newRecipients: string[]) => {
    setTo(newRecipients);
  };

  const handleAiAssistant = () => {
    console.log('AI 어시스턴트 실행');
  };

  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <MailWriteHeader
        onSend={handleSend}
        onCancel={handleCancel}
        onAiAssistant={handleAiAssistant}
        aiButtonWidth="130px" 
        aiButtonHeight="30px"
        aiFontSize="11px"
        isSending={sendMail.isPending || showLoading}
      />
      
      <MailWriteForm
        initialTo={to}
        initialSubject={subject}
        initialContent={content}
        onContentChange={handleContentChange}
        onSubjectChange={handleSubjectChange}
        onRecipientsChange={handleRecipientsChange}
        onAttachmentsChange={handleAttachmentsChange}
      />

        {/* 로딩 오버레이 */}
        {(sendMail.isPending || showLoading) && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className= "flex flex-col items-center">
                    <Spinner size="large" className="mb-4" />
                    <p className="text-white text-lg font-medium">메일을 전송 중입니다...</p>
                </div>
            </div>
        )}
    </div>
  );
};

export default MailWriteTemplate;