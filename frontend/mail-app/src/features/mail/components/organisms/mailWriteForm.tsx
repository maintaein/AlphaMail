import React, { useState } from 'react';
import { MailRecipientInput } from '../molecules/mailRecipientInput';
import { MailSubjectInput } from '../molecules/mailSubjectInput';
import { MailAttachmentInput } from '../molecules/mailAttachmentInput';
import { MailQuillEditor } from '../molecules/mailQuillEditor';

interface Attachment {
  id: number;
  name: string;
  size: number;
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
  onRecipientsChange
}) => {
  const [to, setTo] = useState<string[]>(initialTo);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [content, setContent] = useState<string>(initialContent);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  
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
  
  const handleAddAttachment = (files: FileList) => {
    const newAttachments = [...attachments];
    Array.from(files).forEach(file => {
      newAttachments.push({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size
      });
    });
    setAttachments(newAttachments);
  };
  
  const handleRemoveAttachment = (id: number) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
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