import React, { useEffect } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { useSidebarStore } from '../stores/useSidebarStore';
import { cn } from '../utils/cn';
import { Button } from '@/shared/components/atoms/button';
import { useNavigate } from 'react-router-dom';
import { useMailStore } from '@/features/mail/stores/useMailStore';
import { FolderResponse } from '@/features/mail/types/mail';
import { useMail } from '@/features/mail/hooks/useMail';

interface SideBarProps {
  type: 'mail' | 'work';
  userId?: number;
}


export const SideBar: React.FC<SideBarProps> = ({ type}) => {
    const navigate = useNavigate();
    const { 
      activeItem, 
      setActiveItem, 
      isCollapsed, 
      toggleCollapse,
      contentVisible,
      setContentVisible,
      folders,
      setFolders,
      isLoadingFolders,
      setLoadingFolders
    } = useSidebarStore();
  
    const { setCurrentFolder } = useMailStore();
  
    // 폴더 목록 가져오기 (여기로 이동)
    const { useFolders } = useMail();
    const { data: foldersData, isLoading } = useFolders();
    
    // 폴더 데이터 로딩 처리
    useEffect(() => {
      if (type === 'mail') {
        setLoadingFolders(isLoading);
        
        if (foldersData) {
          console.log('폴더 목록 응답:', foldersData);
          setFolders(foldersData);
        }
      }
    }, [foldersData, isLoading, setFolders, setLoadingFolders, type]);
    
    const getFolderDisplayName = (folderName: string) => {
      switch(folderName) {
        case 'INBOX': return '받은 메일함';
        case 'SENT': return '보낸 메일함';
        case 'TRASH': return '휴지통';
        default: return folderName;
      }
    };

    // isCollapsed 상태가 변경될 때 콘텐츠 가시성 관리
    useEffect(() => {
        // 사이드바가 확장될 때만 지연 후 콘텐츠 표시
        if (!isCollapsed) {
          const timer = setTimeout(() => {
            setContentVisible(true);
          }, 150);
          
          return () => clearTimeout(timer);
        }
    }, [isCollapsed, setContentVisible]);
    
    
    // 메뉴 아이템 클릭 핸들러
    const handleMenuItemClick = (itemName: string, folderId: number) => {
      setActiveItem(itemName);
      // 메일 메뉴 아이템에 따라 라우팅 및 폴더 설정
      if (type === 'mail') {
        setCurrentFolder(folderId);
        
        if (itemName === "받은 메일함") {
          navigate('/mail');
        } else if (itemName === "보낸 메일함") {
          navigate('/mail/sent');
        } else if (itemName === "휴지통") {
          navigate('/mail/trash');
        }
      }
    };
  
    // 메일 작성 페이지로 이동하는 함수
    const handleWriteClick = () => {
      navigate('/mail/write');
    };


    // 타입에 따라 다른 타이틀과 메뉴 아이템 표시
    const renderContent = () => {
        if (type === 'mail') {
            return (
                <>
                  <div className="p-4 flex items-center">
                    <button 
                      onClick={toggleCollapse}
                      className="mr-2 p-1 hover:bg-gray-100 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                    </button>
                    {!isCollapsed && contentVisible && (
                      <Typography variant="titleMedium">메일</Typography>
                    )}
                  </div>
                  
                  {!isCollapsed && contentVisible && (
                    <>
                      <div className="px-4 mb-4 flex justify-center">
                        <Button 
                          size="large" 
                          variant="primary"
                          onClick={handleWriteClick}
                        >
                          메일쓰기
                        </Button>
                      </div>
                      
                      <div className="p-4">
                        <ul className="space-y-2">
                        {isLoadingFolders ? (
                            <li>
                              <Typography variant="caption">폴더 로딩 중...</Typography>
                            </li>
                          ) : (
                            folders?.map((folder: FolderResponse) => {
                              return (
                                <li key={folder.id}>
                                  <button 
                                    className="w-full text-left py-1 px-2 rounded transition-colors"
                                    onClick={() => handleMenuItemClick(getFolderDisplayName(folder.folderName), folder.id)}
                                  >
                                    <Typography 
                                      variant="titleSmall" 
                                      color={activeItem === getFolderDisplayName(folder.folderName) ? "text-[#66BAE4]" : ""}
                                      bold={activeItem === getFolderDisplayName(folder.folderName)}
                                    >
                                      {getFolderDisplayName(folder.folderName)}
                                    </Typography>
                                  </button>
                                </li>
                              );
                            })
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                </>
              );
            } else if (type === 'work') {
              return (
                <>
                  <div className="p-4 flex items-center">
                    <button 
                      onClick={toggleCollapse}
                      className="mr-2 p-1 hover:bg-gray-100 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                    </button>
                    {!isCollapsed && contentVisible && (
                      <Typography variant="titleMedium">work</Typography>
                    )}
                  </div>
                  
                  {!isCollapsed && contentVisible && (
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li>
                          <button 
                            className="w-full text-left py-1 px-2 rounded transition-colors"
                            onClick={() => handleMenuItemClick("거래처 관리", 0)}
                          >
                            <Typography 
                              variant="titleSmall"
                              color={activeItem === "거래처 관리" ? "text-[#66BAE4]" : ""}
                              bold={activeItem === "거래처 관리"}
                            >
                              거래처 관리
                            </Typography>
                          </button>
                        </li>
                        <li>
                          <button 
                            className="w-full text-left py-1 px-2 rounded transition-colors"
                            onClick={() => handleMenuItemClick("발주서 관리", 0)}
                          >
                            <Typography 
                              variant="titleSmall"
                              color={activeItem === "발주서 관리" ? "text-[#66BAE4]" : ""}
                              bold={activeItem === "발주서 관리"}
                            >
                              발주서 관리
                            </Typography>
                          </button>
                        </li>
                        <li>
                          <button 
                            className="w-full text-left py-1 px-2 rounded transition-colors"
                            onClick={() => handleMenuItemClick("재고 관리", 0)}
                          >
                            <Typography
                              variant="titleSmall"
                              color={activeItem === "재고 관리" ? "text-[#66BAE4]" : ""}
                              bold={activeItem === "재고 관리"}
                            >
                              재고 관리
                            </Typography>
                          </button>
                        </li>
                        <li>
                          <button 
                            className="w-full text-left py-1 px-2 rounded transition-colors"
                            onClick={() => handleMenuItemClick("견적서 관리", 0)}
                          >
                            <Typography 
                              variant="titleSmall"
                              color={activeItem === "견적서 관리" ? "text-[#66BAE4]" : ""}
                              bold={activeItem === "견적서 관리"}
                            >
                              견적서 관리
                            </Typography>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              );
            }
        
        return null;
    };
    
    return (
        <div className={cn(
          "h-full border-r border-[#DBD5D5] bg-white transition-all duration-300",
          isCollapsed ? "w-[60px]" : "w-[220px]"
        )}>
          {renderContent()}
        </div>
      );
    };
