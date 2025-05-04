// 메일 목록 조회 응답의 메일 아이템 타입

export interface Mail {
    id: string;
    subject: string;
    sender: {
      name: string;
      email: string;
    };
    receivedAt: string;
    isRead: boolean;
    hasAttachment?: boolean;
    attachmentSize?: number;
  }

export interface MailListRow {
    id: number;
    sender: string;
    subject: string;
    receivedDate: string;
    size: number;
    readStatus: boolean;
  }
  
  // 메일 목록 조회 응답 타입
  export interface MailListResponse {
    mailList: MailListRow[];
    total_count: number;
    readCount: number;
    pageCount: number;
    currentPage: number;
  }
  
  // 메일 상세 조회 응답의 첨부파일 타입
  export interface Attachment {
    id: number;
    name: string;
    size: number;
    type: string;
  }
  
  // 메일 상세 조회 응답 타입
  export interface MailDetailResponse {
    id: number;
    sender: string;
    recipients: string[];
    subject: string;
    bodyText: string;
    bodyHtml: string;
    receivedDate: string;
    emailType: 'RECEIVED' | 'SENT' | 'DRAFT';
    folderId: number;
    readStatus?: boolean;
    attachments?: Attachment[];
  }
  
  // 파일 첨부 응답 타입
  export interface AttachmentUploadResponse {
    id: number;
    name: string;
    path: string;
    size: number;
    type: string;
  }
  
  // 메일 전송 요청 타입
  export interface SendMailRequest {
    sender: string;
    recipients: string[];
    subject: string;
    bodyText: string;
    bodyHtml: string;
    attachments?: Array<{
      attachments_id: number;
    }>;
    inReplyTo?: number | null;
    references?: number[];
  }
  
  // 메일 전송 응답 타입
  export interface SendMailResponse {
    id: number;
    sentDate: string;
    emailType: 'SENT';
  }
  
  // 메일 목록 요청 파라미터 (쿼리 파라미터)
  export interface GetMailsParams {
    folderId?: number;
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'receivedDate' | 'sender' | 'subject' | 'size';
    sortOrder?: 'asc' | 'desc';
    readStatus?: boolean;
  }
  
  // 메일 업데이트 요청 타입 (읽음 상태 변경 등)
  export interface UpdateMailRequest {
    id: number;
    readStatus?: boolean;
    folderId?: number;
  }
  
  // 메일 이동 요청 타입
  export interface MoveMailsRequest {
    ids: number[];
    targetFolderId: number;
  }
  
  // 메일 삭제 요청 타입
  export interface DeleteMailsRequest {
    ids: number[];
  }
  
  // 메일 폴더 타입 (UI에서 사용)
  export interface MailFolder {
    id: number;
    name: string;
    count: number;
    unreadCount?: number;
  }