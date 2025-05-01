import React, { useState, useEffect } from 'react';
import { MailList } from '../organisms/mailList';
import { MailListHeader } from '../organisms/mailListHeader';
import { Pagination } from '../organisms/pagination';
import { Typography } from '@/shared/components/atoms/Typography';
import { useMail } from '../../hooks/useMail';
import { useMailStore } from '../../stores/useMailStore';
import { Mail, MailListRow } from '../../types/mail';
import { useHeaderStore } from '@/shared/stores/useHeaderStore';

const MainTemplate: React.FC = () => {
    const { 
        currentFolder, 
        currentPage, 
        sortOrder,
        searchKeyword,
        selectedMails, 
        setCurrentPage, 
        selectMail, 
        unselectMail, 
        selectAllMails, 
        clearSelection 
        } = useMailStore();
    
  const { useMailList, moveToTrash } = useMail();
  const { data, isLoading, error } = useMailList(currentFolder, currentPage, sortOrder, searchKeyword);
  const { setMailStats } = useHeaderStore();

  const [allSelected, setAllSelected] = useState(false);
  
  useEffect(() => {
    if (data) {
      const totalCount = data.total_count || 0;
      const unreadCount = totalCount - data.readCount || 0;
      
      setMailStats(totalCount, unreadCount);
    }
  }, [data, setMailStats]);


  useEffect(() => {
    // 페이지 변경 시 선택 초기화
    clearSelection();
  }, [currentPage, clearSelection]);
  
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      // API 응답 구조에 맞게 수정: mailList 배열에서 id 추출
      selectAllMails(data?.mailList.map((mail: MailListRow) => mail.id.toString()) || []);
    } else {
      clearSelection();
    }
    setAllSelected(selected);
  };
  
  const handleSelectMail = (id: string, selected: boolean) => {
    if (selected) {
      selectMail(id);
    } else {
      unselectMail(id);
    }
  };
  
  const handleMailClick = (id: string) => {
    // 메일 상세 보기 로직
    console.log('Mail clicked:', id);
  };
  
  const handleDelete = () => {
    if (selectedMails.length > 0) {
        moveToTrash.mutate(selectedMails);
    }
  };
  
  const handleReply = () => {
    if (selectedMails.length === 1) {
      // 답장 로직
      console.log('Reply to:', selectedMails[0]);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // API 응답 구조에 맞게 메일 데이터 변환
  const transformMailsData = (mailList: MailListRow[] = []): Mail[] => {
    return mailList.map(mail => ({
      id: mail.id.toString(),
      subject: mail.subject,
      sender: {
        name: mail.sender.split('@')[0], // 이메일에서 사용자 이름 추출
        email: mail.sender
      },
      receivedAt: mail.receivedDate,
      isRead: mail.readStatus,
      hasAttachment: mail.size > 0, // 크기가 0보다 크면 첨부파일이 있다고 가정
      attachmentSize: mail.size
    }));
  };
  
  return (
    <div className="mail-main-container">
      
      <MailListHeader
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onReply={handleReply}
        onDelete={handleDelete}
        selectedCount={selectedMails.length}
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Typography variant="body">로딩 중...</Typography>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[200px]">
          <Typography variant="body" color="text-red-500">에러가 발생했습니다.</Typography>
        </div>
      ) : (
        <>
          <MailList
            mails={transformMailsData(data?.mailList)}
            selectedMailIds={selectedMails}
            onSelectMail={handleSelectMail}
            onMailClick={handleMailClick}
          />
          
          <Pagination
            currentPage={data?.currentPage || 1}
            totalPages={data?.pageCount || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default MainTemplate;