import { EmailSummaryResponse, EmailTemplate, EmailTemplateRequest } from '../types/aiMail';
import { api } from '@/shared/lib/axiosInstance';

// 로깅 유틸리티 함수
const logApiCall = (method: string, endpoint: string, requestData?: Record<string, unknown>) => {
  console.log(`🚀 API 요청: ${method} ${endpoint}`, requestData ? { 요청데이터: requestData } : '');
};

const logApiResponse = (method: string, endpoint: string, response: Record<string, unknown>, status: number) => {
  console.log(`✅ API 응답: ${method} ${endpoint}`, { 
    상태코드: status, 
    응답데이터: response 
  });
};

const logApiError = (method: string, endpoint: string, error: Record<string, unknown> & { 
  response?: { 
    status?: number, 
    data?: unknown 
  }, 
  message?: string 
}) => {
  console.error(`❌ API 오류: ${method} ${endpoint}`, { 
    상태코드: error.response?.status, 
    오류메시지: error.message,
    응답데이터: error.response?.data
  });
};

// AI 메일 관련 API 서비스
export const aiMailService = {
  // 이메일 템플릿 목록 조회
  getEmailTemplates: async (): Promise<EmailTemplate[]> => {
    const endpoint = '/api/assistants/email-templates';
    logApiCall('GET', endpoint);
    
    try {
      const response = await api.get(endpoint);
      logApiResponse('GET', endpoint, response.data, response.status);
      return response.data;
    } catch (error) {
      logApiError('GET', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },

  // 이메일 템플릿 상세 조회
  getEmailTemplate: async (id: number): Promise<EmailTemplate> => {
    const endpoint = `/api/assistants/email-templates/${id}`;
    logApiCall('GET', endpoint);
    
    try {
      const response = await api.get(endpoint);
      logApiResponse('GET', endpoint, response.data, response.status);
      return response.data;
    } catch (error) {
      logApiError('GET', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },

  // 이메일 템플릿 생성
  createEmailTemplate: async (template: EmailTemplateRequest): Promise<EmailTemplate> => {
    const endpoint = '/api/assistants/email-templates';
    logApiCall('POST', endpoint, template as unknown as Record<string, unknown>);
    
    try {
      const response = await api.post(endpoint, template);
      logApiResponse('POST', endpoint, response.data, response.status);
      return response.data;
    } catch (error) {
      logApiError('POST', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },

  // 이메일 템플릿 수정
  updateEmailTemplate: async (id: number, template: EmailTemplateRequest): Promise<EmailTemplate> => {
    const endpoint = `/api/assistants/email-templates/${id}`;
    logApiCall('PUT', endpoint, template as unknown as Record<string, unknown>);
    
    try {
      const response = await api.put(endpoint, template);
      logApiResponse('PUT', endpoint, response.data, response.status);
      return response.data;
    } catch (error) {
      logApiError('PUT', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },

  // 이메일 템플릿 삭제
  deleteEmailTemplate: async (id: number): Promise<void> => {
    const endpoint = `/api/assistants/email-templates/${id}`;
    logApiCall('DELETE', endpoint);
    
    try {
      const response = await api.delete(endpoint);
      logApiResponse('DELETE', endpoint, response.data || {}, response.status);
    } catch (error) {
      logApiError('DELETE', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },
  
    // 이메일 AI 요약 조회
    getEmailSummary: async (emailId: string): Promise<EmailSummaryResponse> => {
        const endpoint = `/api/assistants/email-summarize/${emailId}`;
        logApiCall('GET', endpoint);
        
        try {
          const response = await api.get(endpoint);
          logApiResponse('GET', endpoint, response.data, response.status);
          return response.data;
        } catch (error) {
          logApiError('GET', endpoint, error as Record<string, unknown> & { 
            response?: { status?: number, data?: unknown }, 
            message?: string 
          });
          throw error;
        }
    },
    
};