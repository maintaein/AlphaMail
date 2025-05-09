import { MailListResponse, MailDetailResponse, UpdateMailRequest, MoveMailsRequest, SendMailRequest, SendMailResponse, FolderResponse } from '../types/mail';
import { api } from '@/shared/lib/axiosInstance';

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

// 메일 서비스 클래스
export const mailService = {
  // 메일 목록 조회
  async getMailList(userId: number = 1, folderId?: number, page: number = 1, size: number = 15, sort: number = 0, content?: string): Promise<MailListResponse> {
    const params = new URLSearchParams();
    params.append('userId', String(userId));
    params.append('page', String(page - 1)); // API는 0부터 시작하는 페이지 인덱스 사용
    params.append('size', String(size));
    params.append('sort', String(sort));
    
    if (content) {
      params.append('content', content);
    }
    
    if (folderId) {
        params.append('folderId', String(folderId));
    }
    
    const endpoint = `/api/mails`;
    logApiCall('GET', endpoint, { params: Object.fromEntries(params) });
    
    try {
      const response = await api.get(endpoint, { params });
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
  
  // 메일 상세 조회
  async getMailDetail(userId: number = 1, id: string | number): Promise<MailDetailResponse> {
    const endpoint = `/api/mails/${id}`;
    const params = new URLSearchParams();
    params.append('userId', String(userId));
    
    logApiCall('GET', endpoint, { params: Object.fromEntries(params) });
    
    try {
      const response = await api.get(endpoint, { params });
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

  // 메일 읽음 상태 변경
  async updateMailReadStatus(userId: number = 1, id: number, readStatus: boolean): Promise<void> {
    const data: UpdateMailRequest = {
      id,
      readStatus,
      userId
    };
    
    const endpoint = `/api/mails/${id}/read-status`;
    logApiCall('PUT', endpoint, data as unknown as Record<string, unknown>);
    
    try {
      const response = await api.put(endpoint, data);
      logApiResponse('PUT', endpoint, response.data, response.status);
    } catch (error) {
      logApiError('PUT', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },

  // 메일 폴더 이동
  async moveMails(userId: number = 1, ids: number[], targetFolderId: number): Promise<void> {
    const data: MoveMailsRequest = {
      ids,
      targetFolderId,
      userId
    };
    
    const endpoint = `/api/mails/move`;
    logApiCall('POST', endpoint, data as unknown as Record<string, unknown>);
    
    try {
      const response = await api.post(endpoint, data);
      logApiResponse('POST', endpoint, response.data, response.status);
    } catch (error) {
      logApiError('POST', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },
  
  // 메일 삭제 (휴지통으로 이동)
  async deleteMails(userId: number = 1, ids: number[]): Promise<void> {
    const data = {
      mailList: ids,
      userId
    };
    
    const endpoint = `/api/mails/trash`;
    logApiCall('PATCH', endpoint, data);
    
    try {
      const response = await api.patch(endpoint, data);
      logApiResponse('PATCH', endpoint, response.data, response.status);
    } catch (error) {
      logApiError('PATCH', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },
  
  // 메일 상세에서 삭제 (휴지통으로 이동)
  async deleteMailById(userId: number = 1, mailId: number, folderId: number = 3): Promise<void> {
    const data = {
      folderId: folderId,
      userId
    };
    
    const endpoint = `/api/mails/${mailId}/trash`;
    logApiCall('PATCH', endpoint, data);
    
    try {
      const response = await api.patch(endpoint, data);
      logApiResponse('PATCH', endpoint, response.data, response.status);
    } catch (error) {
      logApiError('PATCH', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },

  // 메일 영구 삭제 (휴지통 비우기)
  async emptyTrash(userId: number = 1, folderId: number = 3): Promise<{ deletedCount: number }> {
    const data = {
      folderId: folderId,
      userId
    };
    
    const endpoint = `/api/mails/trash`;
    logApiCall('DELETE', endpoint, data);
    
    try {
      const response = await api.delete(endpoint, { 
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      logApiResponse('DELETE', endpoint, response.data, response.status);
      return response.data;
    } catch (error) {
      logApiError('DELETE', endpoint, error as Record<string, unknown> & { 
        response?: { status?: number, data?: unknown }, 
        message?: string 
      });
      throw error;
    }
  },

  // 메일 전송
  async sendMail(userId: number = 1, mailData: SendMailRequest): Promise<SendMailResponse> {
    const endpoint = `/api/mails`;
    const data = { ...mailData, userId };
    logApiCall('POST', endpoint, data);
    
    try {
      const response = await api.post(endpoint, data);
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

  // 폴더 조회 기능 추가
  async getFolders(userId: number = 1): Promise<FolderResponse[]> {
    const endpoint = `/api/mails/folders`;
    const params = new URLSearchParams();
    params.append('userId', String(userId));
    
    logApiCall('GET', endpoint, { params: Object.fromEntries(params) });
    
    try {
      const response = await api.get(endpoint, { params });
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

  async downloadAttachment(mailId: number, attachmentId: number): Promise<Blob> {
    const endpoint = `/api/mails/${mailId}/attachments/${attachmentId}`;
    
    logApiCall('GET', endpoint);
    
    try {
      const response = await api.get(endpoint, { 
        responseType: 'blob' 
      });
      
      // 바이너리 데이터는 로깅하지 않음
      console.log(`✅ API 응답: GET ${endpoint}`, { 
        상태코드: response.status, 
        콘텐츠타입: response.headers['content-type'],
        콘텐츠길이: response.headers['content-length']
      });
      
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