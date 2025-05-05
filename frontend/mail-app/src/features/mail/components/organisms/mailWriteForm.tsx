import React, { useState } from 'react';
import { MailRecipientInput } from '../molecules/mailRecipientInput';
import { MailSubjectInput } from '../molecules/mailSubjectInput';
import { MailAttachmentInput } from '../molecules/mailAttachmentInput';
import { MailQuillEditor } from '../molecules/mailQuillEditor';
import { useMail } from '../../hooks/useMail';

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
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const newAttachments = [...attachments];
      
      // 각 파일을 순차적으로 업로드
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 파일 업로드 API 호출
        const response = await uploadAttachment.mutateAsync(file);
        
        // 업로드 성공한 파일 정보 추가
        newAttachments.push({
          id: response.id,
          name: response.name,
          size: response.size,
          type: response.type
        });
      }
      
      setAttachments(newAttachments);
      
      // 첨부파일 ID 목록 전달
      if (onAttachmentsChange) {
        onAttachmentsChange(newAttachments.map(att => ({ attachments_id: att.id })));
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
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