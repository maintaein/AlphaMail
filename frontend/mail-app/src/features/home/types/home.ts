// AI 비서 항목 타입
export type AssistantType = 'PURCHASE_ORDER' | 'QUOTE' | 'CLIENT' | 'SCHEDULE';

// AI 비서 항목 인터페이스
export interface AssistantItem {
  id: number;
  type: AssistantType;
  title?: string | null;
  userId: number;
  emailId: number;
  emailTime: string;
}

// AI 비서 응답 인터페이스
export interface AssistantsResponse {
  contents: AssistantItem[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
}

// AI 비서 요청 파라미터
export interface AssistantsParams {
  page?: number;
  size?: number;
  sort?: number;
}

// 태그 타입 매핑 (API 응답 타입 -> UI 표시 타입)
export const assistantTypeMap: Record<AssistantType, '발주서' | '견적서' | '거래처' | '일정'> = {
  PURCHASE_ORDER: '발주서',
  QUOTE: '견적서',
  CLIENT: '거래처',
  SCHEDULE: '일정'
};