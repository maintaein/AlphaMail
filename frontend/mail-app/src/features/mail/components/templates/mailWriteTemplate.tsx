import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MailWriteHeader } from '../organisms/mailWriteHeader';
import { MailWriteForm } from '../organisms/mailWriteForm';
import { useMail } from '../../hooks/useMail';
import { SendMailRequest } from '../../types/mail';

const MailWriteTemplate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { useMailDetail, sendMail } = useMail();
  
  const [to, setTo] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [attachments, setAttachments] = useState<Array<{attachments_id: number}>>([]);

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
          navigate('/mail');
        },
        onError: (error) => {
          console.error('메일 전송 실패:', error);
          alert('메일 전송에 실패했습니다.');
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
        isSending={sendMail.isPending}
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
    </div>
  );
};

export default MailWriteTemplate;