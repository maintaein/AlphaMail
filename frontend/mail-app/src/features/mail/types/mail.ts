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
    attachmentSize?: number;
  }

  export interface MailListRow {
    id: number;
    subject: string;
    sender: string;
    receivedDateTime: string;
    sentDateTime: string;
    readStatus: boolean;
    size: number;
  }
  
  // 메일 목록 조회 응답 타입
  export interface MailListResponse {
    emails: MailListRow[];
    totalCount: number;
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
  
  // 메일 스레드 조회 응답의 메일 아이템 타입
  export interface ThreadEmail {
    emailId: number;
    sender: string;
    subject: string;
    dateTime: string;
    originalFolderId: number;
    folderName: string;
  }
  
  // 메일 상세 조회 응답 타입
  export interface MailDetailResponse {
    id: number;
    sender: string;
    recipients: string[];
    subject: string;
    bodyText: string;
    bodyHtml: string;
    receivedDateTime: string; 
    sentDateTime: string; 
    emailType: 'RECEIVED' | 'SENT';
    folderId?: number; 
    readStatus: boolean; 
    hasAttachments: boolean; 
    inReplyTo?: string | null;
    threadId?: string;
    references?: string[];
    attachments?: Attachment[];
    messageId?: string;
    threadEmails?: ThreadEmail[];
    totalThreadCount?: number;
  }
  
  // 파일 첨부 응답 타입
  export interface AttachmentUploadResponse {
    id: number;
    name: string;
    path: string;
    size: number;
    type: string;
  }

  export interface AttachmentUploadRequest {
    file: File;
  }
  
  // 메일 전송 요청 타입
  export interface SendMailRequest {
    sender: string;
    recipients: string[];
    subject: string;
    bodyText: string;
    bodyHtml: string;
    inReplyTo?: string | null;
    references?: string;
    attachments?: {
      name: string;
      size: number;
      type: string;
    }[];  
  }
  
  // 첨부파일 정보 타입 (메일 전송 시 사용)
  export interface AttachmentInfo {
    name: string;
    size: number;
    type: string;
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

  export interface FolderResponse {
    id: number;
    folderName: string;
  }