import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MAIL_QUERY_KEYS } from '../constants/queryKeys';
import { aiMailService } from '../services/aiMailService';
import { EmailTemplateRequest } from '../types/aiMail';

// 이메일 템플릿 관련 훅
export const useEmailTemplates = () => {
  return useQuery({
    queryKey: MAIL_QUERY_KEYS.emailTemplates(),
    queryFn: aiMailService.getEmailTemplates,
  });
};

export const useEmailTemplate = (id: number) => {
  return useQuery({
    queryKey: MAIL_QUERY_KEYS.emailTemplate(id),
    queryFn: () => aiMailService.getEmailTemplate(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
};

export const useCreateEmailTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (template: EmailTemplateRequest) => 
      aiMailService.createEmailTemplate(template),
    onSuccess: () => {
      // 템플릿 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: MAIL_QUERY_KEYS.emailTemplates() });
    },
  });
};

export const useUpdateEmailTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, template }: { id: number; template: EmailTemplateRequest }) => 
      aiMailService.updateEmailTemplate(id, template),
    onSuccess: (data) => {
      // 템플릿 목록 및 상세 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: MAIL_QUERY_KEYS.emailTemplates() });
      queryClient.invalidateQueries({ queryKey: MAIL_QUERY_KEYS.emailTemplate(data.id) });
    },
  });
};

export const useDeleteEmailTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => aiMailService.deleteEmailTemplate(id),
    onSuccess: () => {
      // 템플릿 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: MAIL_QUERY_KEYS.emailTemplates() });
    },
  });
};