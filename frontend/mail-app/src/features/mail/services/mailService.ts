import { MailListResponse, MailDetailResponse, UpdateMailRequest, MoveMailsRequest, SendMailRequest, SendMailResponse, AttachmentUploadResponse } from '../types/mail';
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
    
    await api.put(`/api/mails/${id}/read-status`, data);
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
    const data = {
      mail_list: ids
    };
    
    await api.patch(`/api/mails/trash`, data);
  },
  
  // 메일 상세에서 삭제 (휴지통으로 이동)
  async deleteMailById(mailId: number, folderId: number = 3): Promise<void> {
    const data = {
      folder_id: folderId
    };
    
    await api.patch(`/api/mails/${mailId}/trash`, data);
  },

    // 메일 영구 삭제 (휴지통 비우기)
  async emptyTrash(folderId: number = 3): Promise<{ deletedCount: number }> {
    const data = {
      folder_id: folderId
    };
    
    const response = await api.delete(`/api/mails/trash`, { data });
    return response.data;
  },

  // // 메일 영구 삭제
  // async permanentlyDeleteMails(ids: number[]): Promise<void> {
  //   const data: DeleteMailsRequest = {
  //     ids
  //   };
    
  //   await api.delete(`/api/mails`, { data });
  // },

  // 메일 전송
  async sendMail(mailData: SendMailRequest): Promise<SendMailResponse> {
    const response = await api.post('/api/mails', mailData);
    return response.data;
  },

    // 파일 첨부 업로드
    async uploadAttachment(file: File): Promise<AttachmentUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await api.post('/api/mails/attachment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        return response.data;
      }
    
};