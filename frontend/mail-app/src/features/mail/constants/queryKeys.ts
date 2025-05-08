// React Query에서 사용할 쿼리 키 상수 정의
export const MAIL_QUERY_KEYS = {
    // 메일 목록 조회
    mailList: (userId: number = 1, folderId?: number, page?: number, sort?: number, content?: string) => 
      ['mails', { userId, folderId, page, sort, content }],
    
    // 메일 상세 조회 
    mailDetail: (userId: number = 1, id: string | number) => ['mail', userId, id],
    
    // 메일 폴더 목록
    folders: (userId: number = 1) => ['mail-folders', userId],
    
    // 메일 통계
    stats: 'mail-stats',
    //메일 통계는 뭐지 어디서 쓰는거임?
  };