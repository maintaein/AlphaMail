import React, { useEffect } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { useSidebarStore } from '../stores/useSidebarStore';
import { cn } from '../utils/cn';
import { Button } from '@/shared/components/atoms/button';

interface SideBarProps {
  type: 'mail' | 'work';
}


export const SideBar: React.FC<SideBarProps> = ({ type }) => {

    const { 
        activeItem, 
        setActiveItem, 
        isCollapsed, 
        toggleCollapse,
        contentVisible,
        setContentVisible
      } = useSidebarStore();
    
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
    const handleMenuItemClick = (itemName: string) => {
        setActiveItem(itemName);
        // 해당 아이템의 템플릿을 띄우는 로직 추가 예정
        console.log(`${itemName} 메뉴 클릭됨`);
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
                        <Button size="large" variant="primary">메일쓰기</Button>
                      </div>
                      
                      <div className="p-4">
                        <ul className="space-y-2">
                          <li>
                            <button 
                              className="w-full text-left py-1 px-2 rounded transition-colors"
                              onClick={() => handleMenuItemClick("받은 메일함")}
                            >
                              <Typography 
                                variant="titleSmall" 
                                color={activeItem === "받은 메일함" ? "text-[#66BAE4]" : ""}
                                bold={activeItem === "받은 메일함"}
                              >
                                받은 메일함
                              </Typography>
                            </button>
                          </li>
                          <li>
                            <button 
                              className="w-full text-left py-1 px-2 rounded transition-colors"
                              onClick={() => handleMenuItemClick("보낸 메일함")}
                            >
                              <Typography 
                                variant="titleSmall"
                                color={activeItem === "보낸 메일함" ? "text-[#66BAE4]" : ""}
                                bold={activeItem === "보낸 메일함"}
                              >
                                보낸 메일함
                              </Typography>
                            </button>
                          </li>
                          <li>
                            <button 
                              className="w-full text-left py-1 px-2 rounded transition-colors"
                              onClick={() => handleMenuItemClick("휴지통")}
                            >
                              <Typography 
                                variant="titleSmall"
                                color={activeItem === "휴지통" ? "text-[#66BAE4]" : ""}
                                bold={activeItem === "휴지통"}
                              >
                                휴지통
                              </Typography>
                            </button>
                          </li>
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
                            onClick={() => handleMenuItemClick("거래처 관리")}
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
                            onClick={() => handleMenuItemClick("발주서 관리")}
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
                            onClick={() => handleMenuItemClick("재고 관리")}
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
                            onClick={() => handleMenuItemClick("견적서 관리")}
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
