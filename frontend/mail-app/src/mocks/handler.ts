import { http, HttpResponse } from 'msw';

// 메일 목록 데이터 (모의 데이터)
const mailListData = {
    mailList: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      sender: `sender${i + 1}@example.com`,
      subject: `테스트 메일 제목 ${i + 1}`,
      receivedDate: new Date(2023, 0, i + 1).toISOString(),
      size: Math.floor(Math.random() * 1024),
      readStatus: Math.random() > 0.5,
      folderId: i % 3 + 1 // 1: 받은메일함, 2: 보낸메일함, 3: 휴지통
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
      
      // 전체 메일 목록에서 폴더 필터링 (페이지네이션 전)
      let allFilteredMails = [...mailListData.mailList];
      
      // 폴더 필터링
      if (folderId) {
        const folderIdNum = Number(folderId);
        allFilteredMails = allFilteredMails.filter(mail => mail.folderId === folderIdNum);
      }

      // 검색어 필터링 (전체 데이터에서)
      if (content) {
        allFilteredMails = allFilteredMails.filter(mail => 
          mail.subject.includes(content) || mail.sender.includes(content)
        );
      }
      
      // 전체 메일 수와 읽지 않은 메일 수 계산 (페이지네이션 전)
      const totalCount = allFilteredMails.length;
      const readCount = allFilteredMails.filter(mail => mail.readStatus).length;
      
      // 정렬
      if (sort === 1) { // 오래된 순
        allFilteredMails.sort((a, b) => new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime());
      } else { // 최신순 (기본)
        allFilteredMails.sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime());
      }
      
      // 페이지네이션 처리
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedList = allFilteredMails.slice(startIndex, endIndex);
      
      // 페이지 수 계산
      const pageCount = Math.ceil(totalCount / size);
      
      return HttpResponse.json({
        mailList: paginatedList,
        total_count: totalCount,  // total_count로 변경
        readCount: readCount,     // readCount 추가
        pageCount: pageCount,
        currentPage: page
      });
    }),

    // 메일 상세 조회
    http.get('/api/mails/:id', ({ params }) => {
      
      const { id } = params;
      const mailId = Number(id);
      const isRead = mailReadStatus.get(mailId) || false;
      const mail = mailListData.mailList.find(m => m.id === mailId);
      const folderId = mail?.folderId;
    
      if (mail) {
        // 목록에서 찾은 메일 정보 반환
        return HttpResponse.json({
          id: mail.id,
          sender: mail.sender,
          recipients: ["recipient1@example.com", "recipient2@example.com"],
          subject: mail.subject,
          bodyText: (mail as any).bodyText || `테스트 메일 본문 내용 ${mailId}...`,
          receivedDate: mail.receivedDate,
          emailType: mail.folderId === 2 ? "SENT" : "RECEIVED",
          folderId: mail.folderId,
          readStatus: mail.readStatus,
          attachments: (mail as any).attachments || []
        });
      }
    
      // 메일 ID에 따라 다른 내용 반환 (실제로는 DB 조회 등의 로직)
      return HttpResponse.json({
        id: mailId,
        sender: `sender${mailId}@example.com`,
        recipients: ["recipient1@example.com", "recipient2@example.com"],
        subject: `테스트 메일 제목 ${mailId}`,
        bodyText: `테스트 메일 본문 내용 ${mailId}...`,
        receivedDate: new Date(2023, 0, mailId).toISOString(),
        emailType: "RECEIVED",
        folderId: folderId,
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
  http.patch('/api/mails/trash', async ({ request }) => {
    const data = await request.json() as { mail_list: (number | string)[] };
    console.log(`메일 ${data.mail_list.join(', ')}를 휴지통으로 이동`);
    
    // ID 형식 통일 (문자열 -> 숫자)
    const mailIds = data.mail_list.map(id => typeof id === 'string' ? parseInt(id) : id);
    
    // 각 메일의 폴더 ID 변경
    let movedCount = 0;
    
    mailIds.forEach(mailId => {
      const mailIndex = mailListData.mailList.findIndex(mail => mail.id === mailId);
      if (mailIndex !== -1) {
        // 타입 단언으로 속성 추가
        (mailListData.mailList[mailIndex] as any).folderId = 3; // 휴지통 폴더 ID
        movedCount++;
        console.log(`메일 ID ${mailId}를 휴지통으로 이동 완료`);
      }
    });
    
    console.log(`총 ${movedCount}개 메일이 휴지통으로 이동됨`);
    
    return HttpResponse.json({
      success: true,
      message: `${movedCount}개의 메일이 휴지통으로 이동되었습니다.`
    });
  }),

    // 메일 상세에서 삭제 (휴지통으로 이동)
    http.patch('/api/mails/:id/trash', async ({ params }) => {
      const { id } = params;
      const mailId = Number(id);
      
      console.log(`메일 ${mailId}를 휴지통으로 이동`);
      
      // 메일 찾기
      const mailIndex = mailListData.mailList.findIndex(mail => mail.id === mailId);
      
      if (mailIndex !== -1) {
        // 메일을 휴지통으로 이동 (folderId를 3으로 변경)
        (mailListData.mailList[mailIndex] as any).folderId = 3; // 휴지통 폴더 ID
        console.log(`메일 ID ${mailId}를 휴지통으로 이동 완료`);
        
        return HttpResponse.json({
          success: true,
          message: "메일이 휴지통으로 이동되었습니다."
        });
      } else {
        // 메일을 찾지 못한 경우
        return new HttpResponse(null, {
          status: 404,
          statusText: "메일을 찾을 수 없습니다."
        });
      }
    }),

    // 휴지통 비우기 (영구 삭제)
    http.delete('/api/mails/trash', async ({ request }) => {
      const data = await request.json() as { folder_id: number };
      
      // 휴지통에 있는 메일만 필터링 (folderId가 3인 메일)
      const trashMails = mailListData.mailList.filter(mail => mail.folderId === 3);
      const deletedCount = trashMails.length;
      
      // 휴지통에 있는 메일만 삭제
      mailListData.mailList = mailListData.mailList.filter(mail => mail.folderId !== 3);

      console.log(`휴지통(폴더 ID: ${data.folder_id})의 모든 메일 ${deletedCount}개를 영구 삭제`);
      
      return HttpResponse.json({
        deletedCount: deletedCount,
        message: "휴지통이 비워졌습니다."
      });
    }),

    // 메일 전송
    http.post('/api/mails', async ({ request }) => {
      const data = await request.json() as { 
        sender: string; 
        subject: string; 
        recipients?: string[];  // recipients 타입 추가
        bodyText?: string;      // bodyText 타입 추가
        attachments?: {attachment_id: number, name: string, size: number, type: string}[]
      };
          
      // 새 메일 ID 생성
      const newMailId = Math.floor(Math.random() * 1000) + 100;
      
      // 보낸 메일함에 추가 (folderId = 2로 명시)
      const newMail = {
        id: newMailId,
        sender: data.sender || 'unknown@example.com',
        recipients: data.recipients || [],
        subject: data.subject || '(제목 없음)',
        bodyText: data.bodyText || '',
        receivedDate: new Date().toISOString(),
        size: data.attachments?.length ? 1024 : 0,
        readStatus: true,
        folderId: 2, // 보낸 메일함
        attachments: data.attachments || []
      };
      
      // 타입 단언으로 추가
      mailListData.mailList.push(newMail as any);
      
      console.log('새 메일 추가됨:', newMail);
      
      return HttpResponse.json({
        id: newMailId,
        sentDate: new Date().toISOString(),
        emailType: 'SENT'
      });
    }),

    // 파일 첨부 API 핸들러 추가
    http.post('/api/mails/attachment', async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        console.log('파일 첨부 요청:', file.name, file.size, file.type);
        
        // 성공 응답 반환
        return HttpResponse.json({
        id: Math.floor(Math.random() * 1000),
        name: file.name,
        path: `/attachments/${file.name}`,
        size: file.size,
        type: file.type
        });
    }),
    
  ];
  