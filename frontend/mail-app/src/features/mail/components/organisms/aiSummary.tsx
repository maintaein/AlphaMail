import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { useEmailSummary } from '../../hooks/useAiMail';
import ReactMarkdown from 'react-markdown';

interface AiSummaryProps {
  emailId: string;
}

const AiSummary: React.FC<AiSummaryProps> = ({ emailId }) => {
  const { data, isLoading, isError } = useEmailSummary(emailId);

  if (isLoading) {
    return (
      <div className="p-4">
        <Typography variant="titleSmall" bold className="mb-3">메일 요약</Typography>
        <div className="bg-blue-50 p-4 rounded-lg">
          <Typography variant="body" color="secondary">요약 정보를 불러오는 중입니다...</Typography>
        </div>
      </div>
    );
  }
  
  if (isError || data?.status === 'error') {
    return (
      <div className="p-4">
        <Typography variant="titleSmall" bold className="mb-3">메일 요약</Typography>
        <div className="bg-red-50 p-4 rounded-lg">
          <Typography variant="body" color="error">요약 정보를 불러오는데 실패했습니다.</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Typography variant="titleSmall" bold className="mb-3">메일 요약</Typography>
      <div className="bg-blue-50 p-4 rounded-lg markdown-content">
        {data?.summary ? (
          <ReactMarkdown
            components={{
              // 마크다운 요소에 스타일 적용
              h1: ({ children, ...props}) => <Typography variant="titleLarge" bold className="mt-4 mb-2" {...props}>{children}</Typography>,
              h2: ({children, ...props}) => <Typography variant="titleMedium" bold className="mt-3 mb-2" {...props}>{children}</Typography>,
              h3: ({children, ...props}) => <Typography variant="titleSmall" bold className="mt-2 mb-1" {...props}>{children}</Typography>,
              p: ({children, ...props}) => <Typography variant="body" className="mb-2" {...props}>{children}</Typography>,
              ul: ({children, ...props}) => <ul className="list-disc pl-5 mb-2" {...props}>{children}</ul>,
              ol: ({children, ...props}) => <ol className="list-decimal pl-5 mb-2" {...props}>{children}</ol>,
              li: ({children, ...props}) => <li className="mb-1" {...props}>{children}</li>,
              a: ({children, ...props}) => <a className="text-blue-600 hover:underline" {...props}>{children}</a>,
              blockquote: ({children, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props}>{children}</blockquote>,
              code: ({children, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>{children}</code>
            }}
          >
            {data.summary}
          </ReactMarkdown>
        ) : (
          <Typography variant="body" color="secondary">요약 정보가 없습니다.</Typography>
        )}
      </div>
    </div>
  );
};

export default AiSummary;