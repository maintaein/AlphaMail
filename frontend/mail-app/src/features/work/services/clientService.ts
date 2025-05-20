import { api } from '@/shared/lib/axiosInstance';
import {
  Client,
  ClientDetail,
  ClientResponse,
} from '../types/clients';

interface GetClientsParams {
  query?: string;
  page?: number;
  size?: number;
  sort?: number;
  companyId: number;
}

interface EmailOCR {
  licenseNum: string;
  address: string;
  corpName: string;
  representative: string;
  businessType: string;
  businessItem: string;
  success: boolean;
}

export const clientService = {
  
  validateBusinessLicense: (file: File | null): boolean => {
    if (!file) return false;
    
    const allowedTypes = [
      'application/pdf', 
      'image/jpeg', 
      'image/jpg', 
      'image/png'
    ];
    const fileType = file.type;
    
    return allowedTypes.includes(fileType);
  },
  
  uploadBusinessLicenseOCR: async (file: File): Promise<EmailOCR> => {
    // 파일 형식 검증
    if (!clientService.validateBusinessLicense(file)) {
      throw new Error('사업자등록증은 PDF, JPG, JPEG 또는 PNG 형식만 업로드 가능합니다.');
    }
  
    const formData = new FormData();
    formData.append('file', file);
    
    // OCR 처리 엔드포인트로 POST 요청
    const response = await api.post<EmailOCR>('/api/erp/clients/ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  // 거래처 목록 조회
  getClients: async (params: GetClientsParams) => {
    const response = await api.get<ClientResponse>(`/api/erp/companies/${params.companyId}/clients`, {
      params: {
        ...(params?.query && { query: params.query }),
        ...(params?.page && { page: params.page - 1 }),
        ...(params?.size && { size: params.size })
      }
    });

    return response.data;
  },

  // 거래처 상세 조회
  getClient: async (id: string) => {
    const response = await api.get<ClientDetail>(`/api/erp/clients/${id}`);
    return response.data;
  },

  // 거래처 생성
  createClient: async (companyId: number, groupId: number, client: ClientDetail) => {
    const requestData = {
      companyId: companyId,
      groupId: groupId,
      licenseNum: client.licenseNum,
      corpName: client.corpName,
      representative: client.representative,
      phoneNum: client.phoneNum,
      email: client.email,
      address: client.address,
      businessType: client.businessType,
      businessItem: client.businessItem,
      businessLicense: client.businessLicense,
    };

    const response = await api.post<Client>('/api/erp/clients', requestData);
    return response.data;
  },

  // 거래처 수정
  updateClient: async (id: string, client: ClientDetail) => {
    const requestData = {
      licenseNum: client.licenseNum,
      corpName: client.corpName,
      representative: client.representative,
      phoneNum: client.phoneNum,
      email: client.email,
      address: client.address,
      businessType: client.businessType,
      businessItem: client.businessItem,
      businessLicense: client.businessLicense,
    };

    const response = await api.put<ClientDetail>(`/api/erp/clients/${id}`, requestData);
    return response.data;
  },

  // 거래처 삭제
  deleteClient: async (id: number) => {
    await api.delete(`/api/erp/clients/${id}`);
  },

  // 선택된 거래처들 삭제 (옵션)
  deleteClients: async (ids: number[]) => {
    await api.post('/api/erp/clients/delete', {
      ids: ids
    });
  }
};