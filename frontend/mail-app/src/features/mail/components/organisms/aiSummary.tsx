import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { useEmailSummary } from '../../hooks/useAiMail';

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
      <div className="bg-blue-50 p-4 rounded-lg">
        <Typography variant="body" color="secondary">{data?.summary}</Typography>
      </div>
    </div>
  );
};

export default AiSummary;