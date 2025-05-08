// React Query에서 사용할 쿼리 키 상수 정의
export const MAIL_QUERY_KEYS = {
    mailList: (userId: number = 1, folderId?: number, page?: number, sort?: number, content?: string) => 
      ['mails', { userId, folderId, page, sort, content }],
    
    mailDetail: (userId: number = 1, id: string | number) => ['mail', userId, id],
    
    folders: (userId: number = 1) => ['mail-folders', userId],
    
    attachment: (userId: number = 1, mailId: number, attachmentId: number) => 
      ['mail-attachment', userId, mailId, attachmentId],

    stats: 'mail-stats',
    //메일 통계는 뭐지 어디서 쓰는거임?
  };