import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface Attachment {
  name: string;
  size: string;
}

interface TmpMailAttachmentsProps {
  attachments: Attachment[];
}

export const TmpMailAttachments: React.FC<TmpMailAttachmentsProps> = ({ attachments }) => {
  if (attachments.length === 0) return null;
  
  return (
    <div className="mb-2">
      <div className="flex mb-1">
        <Typography variant="body" className="text-gray-600 w-20">
          첨부 {attachments.length}개
        </Typography>
        <Typography variant="body" className="text-gray-500">
          {attachments.reduce((acc, curr) => acc + parseInt(curr.size), 0)}KB
        </Typography>
      </div>
      
      <div className="ml-20">
        {attachments.map((attachment, index) => (
          <div key={index} className="border bg-white border-gray-300 rounded-md p-2 mb-1 flex items-center">
            <div className="w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-sm mr-2">
              <span className="text-xs">file</span>
            </div>
            <Typography variant="body">
              {attachment.name}
            </Typography>
            <div className="flex ml-auto space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
              <img src="/download_icon.png" alt="Chatbot" style={{ width: 25, height: 25, objectFit: 'contain' }} />
              
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};