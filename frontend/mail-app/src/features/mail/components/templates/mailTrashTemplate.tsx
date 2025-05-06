import React, { useState, useEffect } from 'react';
import { MailList } from '../organisms/mailList';
import { MailListHeader } from '../organisms/mailListHeader';
import { Pagination } from '../organisms/pagination';
import { Typography } from '@/shared/components/atoms/Typography';
import { useMail } from '../../hooks/useMail';
import { useMailStore } from '../../stores/useMailStore';
import { Mail, MailListRow } from '../../types/mail';
import { useHeaderStore } from '@/shared/stores/useHeaderStore';
import { useNavigate } from 'react-router-dom';

const MailTrashTemplate: React.FC = () => {
  // 휴지통은 folderId가 3
  const { 
    currentPage, 
    sortOrder,
    searchKeyword,
    selectedMails, 
    setCurrentPage, 
    selectMail, 
    unselectMail, 
    selectAllMails, 
    clearSelection,
    setCurrentFolder
  } = useMailStore();
  
  // 컴포넌트 마운트 시 현재 폴더를 휴지통(3)으로 설정
  useEffect(() => {
    setCurrentFolder(3);
  }, [setCurrentFolder]);
  
  const { useMailList, emptyTrash } = useMail();
  const { data, isLoading, error } = useMailList(3, currentPage, sortOrder, searchKeyword);
  const { setMailStats } = useHeaderStore();
  const navigate = useNavigate();
  const [allSelected, setAllSelected] = useState(false);
  
  useEffect(() => {
    if (data) {
      const totalCount = data.total_count || 0;
      setMailStats(totalCount, 0);
    }
  }, [data, setMailStats]);

  useEffect(() => {
    // 페이지 변경 시 선택 초기화
    clearSelection();
  }, [currentPage, clearSelection]);
  
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
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
    navigate(`/mail/${id}`);
  };
  
  // 휴지통 비우기 (모든 메일 영구 삭제)
  const handleEmptyTrash = () => {
    // 확인 대화상자 표시
    if (window.confirm('휴지통의 모든 메일을 영구적으로 삭제하시겠습니까?')) {
      emptyTrash.mutate(3); // 휴지통 폴더 ID (3) 전달
    }
  };
  
  // const handleRestore = () => {
  //   if (selectedMails.length > 0) {
  //     // 받은 메일함(1)으로 복원
  //     moveToFolder.mutate({ ids: selectedMails, targetFolderId: 1 });
  //   }
  // };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // API 응답 구조에 맞게 메일 데이터 변환
  const transformMailsData = (mailList: MailListRow[] = []): Mail[] => {
    return mailList.map(mail => ({
      id: mail.id.toString(),
      subject: mail.subject,
      sender: {
        name: mail.sender.split('@')[0],
        email: mail.sender
      },
      receivedAt: mail.receivedDate,
      isRead: mail.readStatus,
      hasAttachment: mail.size > 0,
      attachmentSize: mail.size
    }));
  };
  
  return (
    <div className="mail-main-container">      
      <div className="flex justify-between items-center mb-4">
        <MailListHeader
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          selectedCount={selectedMails.length}
          // onRestore={handleRestore}
          folderType="trash"
          onEmptyTrash={handleEmptyTrash}
        />
        
      </div>
              
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

export default MailTrashTemplate;