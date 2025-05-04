import { http, HttpResponse } from 'msw';

// 메일 목록 데이터 (모의 데이터)
const mailListData = {
    mailList: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      sender: `sender${i + 1}@example.com`,
      subject: `테스트 메일 제목 ${i + 1}`,
      receivedDate: new Date(2023, 0, i + 1).toISOString(),
      size: Math.floor(Math.random() * 1024),
      readStatus: Math.random() > 0.5
    })),
    totalCount: 20,
    pageCount: 2,
    currentPage: 0
  };
  
  // 첨부 파일 모의 데이터
  const attachments = [
    {
      id: 456,
      name: "document.pdf",
      size: 1024,
      type: "application/pdf"
    },
    {
      id: 457,
      name: "image.jpg",
      size: 2048,
      type: "image/jpeg"
    }
  ];
  const mailReadStatus = new Map();
  export const handlers = [
    
    // 메일 목록 조회
    http.get('/api/mails', ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get('page') || 0);
      const size = Number(url.searchParams.get('size') || 15);
      const sort = Number(url.searchParams.get('sort') || 0);
      const folderId = url.searchParams.get('folderId');
      const content = url.searchParams.get('content');
      

      // 페이지네이션 처리
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedList = mailListData.mailList.slice(startIndex, endIndex);
      
      // 폴더 필터링 (실제로는 더 복잡한 로직이 필요할 수 있음)
      let filteredList = paginatedList;
      if (folderId) {
        // 폴더 ID에 따른 필터링 로직
        // 예: 받은 메일함(1), 보낸 메일함(2) 등
      }
      
      // 검색어 필터링
      if (content) {
        filteredList = filteredList.filter(mail => 
          mail.subject.includes(content) || mail.sender.includes(content)
        );
      }
      
      // 정렬
      if (sort === 1) { // 오래된 순
        filteredList.sort((a, b) => new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime());
      } else { // 최신순 (기본)
        filteredList.sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime());
      }
      
      return HttpResponse.json({
        mailList: filteredList,
        totalCount: mailListData.totalCount,
        pageCount: mailListData.pageCount,
        currentPage: page
      });
    }),
    
    // 메일 상세 조회
    http.get('/api/mails/:id', ({ params }) => {
      
      const { id } = params;
      const mailId = Number(id);
      const isRead = mailReadStatus.get(mailId) || false;

      // 메일 ID에 따라 다른 내용 반환 (실제로는 DB 조회 등의 로직)
      return HttpResponse.json({
        id: mailId,
        sender: `sender${mailId}@example.com`,
        recipients: ["recipient1@example.com", "recipient2@example.com"],
        subject: `테스트 메일 제목 ${mailId}`,
        bodyText: `테스트 메일 본문 내용 ${mailId}...`,
        receivedDate: new Date(2023, 0, mailId).toISOString(),
        emailType: "RECEIVED",
        folderId: 1,
        readStatus: isRead,
        attachments: mailId % 2 === 0 ? attachments : [] // 짝수 ID만 첨부파일 있음
      });
    }),
    
    // 메일 읽음 상태 변경
    http.put('/api/mails/:id/read-status', async ({ params, request }) => {
      const { id } = params;
      const mailId = Number(id);
      const data = await request.json() as { readStatus: boolean };
      
      mailReadStatus.set(mailId, data.readStatus);

      console.log(`메일 ${id}의 읽음 상태를 ${data.readStatus ? '읽음' : '안읽음'}으로 변경`);
      
      return HttpResponse.json({
        success: true,
        message: "메일 상태가 업데이트되었습니다."
      });
    }),
    
    // 메일 폴더 이동
    http.post('/api/mails/move', async ({ request }) => {
      const data = await request.json() as { ids: number[], targetFolderId: number };
      
      console.log(`메일 ${data.ids.join(', ')}를 폴더 ${data.targetFolderId}로 이동`);
      
      return HttpResponse.json({
        success: true,
        message: "메일이 이동되었습니다."
      });
    }),
    
    // 메일 삭제 (휴지통으로 이동)
    http.post('/api/mails/delete', async ({ request }) => {
      const data = await request.json() as { ids: number[] };
      
      console.log(`메일 ${data.ids.join(', ')}를 휴지통으로 이동`);
      
      return HttpResponse.json({
        success: true,
        message: "메일이 휴지통으로 이동되었습니다."
      });
    }),
    
    // 메일 영구 삭제
    http.delete('/api/mails', async ({ request }) => {
      const data = await request.json() as { ids: number[] };
      
      console.log(`메일 ${data.ids.join(', ')}를 영구 삭제`);
      
      return HttpResponse.json({
        success: true,
        message: "메일이 영구 삭제되었습니다."
      });
    })
  ];
  