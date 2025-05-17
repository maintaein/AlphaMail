// React Query에서 사용할 쿼리 키 상수 정의
export const MAIL_QUERY_KEYS = {
    mailList: (folderId?: number, page?: number, sort?: number, keyword?: string) => 
      ['mailList', folderId, page, sort, keyword],
    
    mailDetail: (id: string | number) => ['mail', id],
    
    folders: () => ['mail-folders'],
    
    attachment: (mailId: number, attachmentId: number) => 
      ['mail-attachment', mailId, attachmentId],

    stats: 'mail-stats',

    emailTemplates: () => ['email-templates'],
    emailTemplate: (id: number) => ['email-template', id],  
  };