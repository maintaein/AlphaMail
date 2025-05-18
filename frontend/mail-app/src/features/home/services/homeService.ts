import { api } from '@/shared/lib/axiosInstance';
import { AssistantsParams, AssistantsResponse } from '../types/home';

// 로깅 함수
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
  console.error(`❌ API 에러: ${method} ${endpoint}`, {
    상태코드: error.response?.status,
    에러메시지: error.message,
    에러데이터: error.response?.data
  });
};

export const homeService = {
  /**
   * AI 비서 항목 목록을 조회합니다.
   */
  async getAssistants(params: AssistantsParams = {}): Promise<AssistantsResponse> {
    const { page = 0, size = 10, sort = 0 } = params;
    const queryParams = new URLSearchParams();
    
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
    queryParams.append('sort', sort.toString());
    
    const endpoint = `/api/assistants?${queryParams.toString()}`;
    
    logApiCall('GET', endpoint, params as Record<string, unknown>);
    
    try {
      const response = await api.get<AssistantsResponse>(endpoint);
      logApiResponse('GET', endpoint, response.data as unknown as Record<string, unknown>, response.status);
      return response.data;
    } catch (error) {
      logApiError('GET', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },
  
  /**
   * AI 비서 항목을 삭제합니다.
   */
  async deleteAssistant(id: number): Promise<void> {
    const endpoint = `/api/assistants/${id}`;
    
    logApiCall('DELETE', endpoint, { id });
    
    try {
      const response = await api.delete(endpoint);
      logApiResponse('DELETE', endpoint, response.data as Record<string, unknown>, response.status);
      return response.data;
    } catch (error) {
      logApiError('DELETE', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  }
};