import React, { useState } from 'react';
import { MailRecipientInput } from '../molecules/mailRecipientInput';
import { MailSubjectInput } from '../molecules/mailSubjectInput';
import { MailAttachmentInput } from '../molecules/mailAttachmentInput';
import { MailQuillEditor } from '../molecules/mailQuillEditor';
import { useMail } from '../../hooks/useMail';
import { toast } from 'react-toastify';
import { useRef } from 'react';

interface Attachment {
  id: number;
  name: string;
  size: number;
  type: string;
}

interface MailWriteFormProps {
  initialTo?: string[];
  initialSubject?: string;
  initialContent?: string;
  onContentChange: (content: string) => void;
  onSubjectChange: (subject: string) => void;
  onRecipientsChange: (recipients: string[]) => void;
  onAttachmentsChange?: (attachments: Array<{attachments_id: number}>) => void;
}

export const MailWriteForm: React.FC<MailWriteFormProps> = ({
  initialTo = [],
  initialSubject = '',
  initialContent = '',
  onContentChange,
  onSubjectChange,
  onRecipientsChange,
  onAttachmentsChange
}) => {
  const { uploadAttachment } = useMail();
  const [to, setTo] = useState<string[]>(initialTo);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [content, setContent] = useState<string>(initialContent);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_TOTAL_ATTACHMENTS_SIZE = 10 * 1024 * 1024; // 10MB
  const lastToastIdRef = useRef<string | number | null>(null);

  const showToast = (message: string, type: 'error' | 'warning' | 'info' | 'success' = 'error') => {
    // 이전 토스트가 있으면 닫기
    if (lastToastIdRef.current) {
      toast.dismiss(lastToastIdRef.current);
    }
    
    // 새 토스트 표시 및 ID 저장
    const toastId = toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    lastToastIdRef.current = toastId;
  };

  const handleAddRecipient = (email: string) => {
    const newTo = [...to, email];
    setTo(newTo);
    onRecipientsChange(newTo);
  };
  
  const handleRemoveRecipient = (index: number) => {
    const newTo = [...to];
    newTo.splice(index, 1);
    setTo(newTo);
    onRecipientsChange(newTo);
  };
  
  
  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
    onSubjectChange(newSubject);
  };
  
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onContentChange(newContent);
  };
  
  const handleAddAttachment = async (files: FileList) => {

    // 현재 첨부파일의 총 크기 계산
    const currentTotalSize = attachments.reduce((total, attachment) => {
      return total + (attachment.size || 0);
    }, 0);

    // 새 파일들 처리
    for (const file of files) {
      // 개별 파일 크기 검사
      if (file.size > MAX_ATTACHMENT_SIZE) {
        showToast(`${file.name}의 크기가 10MB를 초과합니다. 10MB 이하의 파일만 첨부 가능합니다.`, 'error');
        continue;
      }
      
      // 총 첨부파일 크기 검사
      if (currentTotalSize + file.size > MAX_TOTAL_ATTACHMENTS_SIZE) {
        showToast('총 첨부파일 크기가 10MB를 초과합니다.', 'error');
        break;
      }
      
      // 파일 업로드 처리
      setIsUploading(true);
      
      // 파일 업로드 API 호출
      uploadAttachment.mutate(file, {
        onSuccess: (response) => {
          const newAttachment = {
            id: response.id,
            name: file.name,
            size: file.size,
            type: file.type
          };
      
          const updatedAttachments = [...attachments, newAttachment];
          setAttachments(updatedAttachments);
        },
        onError: (error) => {
          showToast(`파일 업로드 실패: ${error.message}`, 'error');
        },
        onSettled: () => {
          setIsUploading(false);
        }
      });
    }

  };

  const handleRemoveAttachment = (id: number) => {
    const newAttachments = attachments.filter(attachment => attachment.id !== id);
    setAttachments(newAttachments);
    
    // 첨부파일 ID 목록 전달
    if (onAttachmentsChange) {
      onAttachmentsChange(newAttachments.map(att => ({ attachments_id: att.id })));
    }
  };
  
  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b border-gray-200">
        <MailRecipientInput
          label="받는 사람"
          recipients={to}
          onAddRecipient={handleAddRecipient}
          onRemoveRecipient={handleRemoveRecipient}
        />
                
        <MailSubjectInput
          subject={subject}
          onChange={handleSubjectChange}
        />
        
        <MailAttachmentInput
          attachments={attachments}
          onAddAttachment={handleAddAttachment}
          onRemoveAttachment={handleRemoveAttachment}
          isUploading={isUploading}
        />
      </div>
      
      <div className="flex-1">
        <MailQuillEditor
          content={content}
          onChange={handleContentChange}
        />
      </div>
      
    </div>
  );
};