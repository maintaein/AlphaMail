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

const MainTemplate: React.FC = () => {
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
  
  // 컴포넌트 마운트 시 현재 폴더를 받은 메일함(1)으로 설정
  useEffect(() => {
    setCurrentFolder(1);
  }, [setCurrentFolder]);
  
  const { useMailList, moveToTrash } = useMail();
  const { data, isLoading, error, refetch } = useMailList( 1, currentPage, sortOrder, searchKeyword);
  const { setMailStats } = useHeaderStore();
  const navigate = useNavigate();
  const [allSelected, setAllSelected] = useState(false);
  
  useEffect(() => {
    if (data) {
      const totalCount = data.totalCount || 0;
      const unreadCount = totalCount - (data.readCount || 0);
      setMailStats(totalCount, unreadCount);
    }
  }, [data, setMailStats]);
  
  useEffect(() => {
    // 페이지 변경 시 선택 초기화
    clearSelection();
  }, [currentPage, clearSelection]);
  
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      selectAllMails(data?.emails.map((mail: MailListRow) => mail.id.toString()) || []);
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
  
  const handleDelete = () => {
    if (selectedMails.length > 0) {
      moveToTrash.mutate({ mailIds: selectedMails }, {
        onSuccess: () => {
          // 삭제 성공 후 메일 목록 다시 가져오기
          refetch();
          // 선택 상태 초기화
          clearSelection();
          setAllSelected(false);
        }
      });
    }
  };
  
  const handleReply = () => {
    if (selectedMails.length === 1) {
      navigate(`/mail/write?reply=${selectedMails[0]}`);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // API 응답 구조에 맞게 메일 데이터 변환
  const transformMailsData = (emails: MailListRow[] = []): Mail[] => {
    return emails.map(mail => {
      // UTC 시간을 한국 시간으로 변환 (UTC+9)
      const receivedTime = mail.receivedDateTime || mail.sentDateTime;
      const koreaTime = new Date(new Date(receivedTime).getTime() + 9 * 60 * 60 * 1000).toISOString();
      
      return {
        id: mail.id.toString(),
        subject: mail.subject,
        sender: {
          name: mail.sender.split('@')[0],
          email: mail.sender
        },
        receivedAt: koreaTime,
        isRead: mail.readStatus === undefined ? true : mail.readStatus,
        attachmentSize: mail.size > 0 ? mail.size : 0
      };
    });
  };
  
  return (
    <div className="mail-main-container">      
      <MailListHeader
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onReply={handleReply}
        onMoveToTrash={handleDelete}
        selectedCount={selectedMails.length}
        folderType="inbox"
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
            mails={transformMailsData(data?.emails)}
            selectedMailIds={selectedMails}
            onSelectMail={handleSelectMail}
            onMailClick={handleMailClick}
          />
          
          <Pagination
            currentPage={(data?.currentPage || 0) + 1}
            totalPages={data?.pageCount || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default MainTemplate;