import { MailListResponse, MailDetailResponse, UpdateMailRequest, MoveMailsRequest, DeleteMailsRequest } from '../types/mail';
import { api } from '@/shared/lib/axiosInstance';


// 메일 서비스 클래스
export const mailService = {
  // 메일 목록 조회
  async getMailList(folderId?: number, page: number = 1, size: number = 15, sort: number = 0, content?: string): Promise<MailListResponse> {
    const params = new URLSearchParams();
    params.append('page', String(page - 1)); // API는 0부터 시작하는 페이지 인덱스 사용
    params.append('size', String(size));
    params.append('sort', String(sort));
    
    if (content) {
      params.append('content', content);
    }
    
    if (folderId) {
        params.append('folderId', String(folderId));
    }
  
    const response = await api.get(`/api/mails`, { params });
    return response.data;
  },
  
  // 메일 상세 조회
  async getMailDetail(id: string | number): Promise<MailDetailResponse> {
    const response = await api.get(`/api/mails/${id}`);
    return response.data;
  },
  
  // 메일 읽음 상태 변경
  async updateMailReadStatus(id: number, readStatus: boolean): Promise<void> {
    const data: UpdateMailRequest = {
      id,
      readStatus
    };
    
    await api.patch(`/api/mails/${id}/read-status`, data);
  },
  
  // 메일 폴더 이동
  async moveMails(ids: number[], targetFolderId: number): Promise<void> {
    const data: MoveMailsRequest = {
      ids,
      targetFolderId
    };
    
    await api.post(`/api/mails/move`, data);
  },
  
  // 메일 삭제 (휴지통으로 이동)
  async deleteMails(ids: number[]): Promise<void> {
    const data: DeleteMailsRequest = {
      ids
    };
    
    await api.post(`/api/mails/delete`, data);
  },
  
  // 메일 영구 삭제
  async permanentlyDeleteMails(ids: number[]): Promise<void> {
    const data: DeleteMailsRequest = {
      ids
    };
    
    await api.delete(`/api/mails`, { data });
  }
};