import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import AiTemplateAdd from '../molecules/aiTemplateAdd';
import AiTemplateCell from '../molecules/aiTemplateCell';
import AiTemplateEdit from './aiTemplateEdit';
import { useAiStore } from '../../stores/useAiStore';

const AiTemplateList: React.FC = () => {
  // useAiStore에서 상태와 액션 가져오기
  const { 
    templates, 
    selectedTemplateId, 
    selectTemplate, 
    clearSelectedTemplate, 
    deleteTemplate,
    setAddingNewTemplate
  } = useAiStore();

  // 새 템플릿 추가 핸들러
  const handleAddTemplate = () => {
    console.log('새 템플릿 추가');
    setAddingNewTemplate(true);
    // 임시 ID로 템플릿 선택 (실제로는 새 템플릿 ID 생성 필요)
    selectTemplate('new');
  };
  
  // 템플릿 선택 핸들러
  const handleSelectTemplate = (id: string) => {
    console.log(`템플릿 선택: ${id}`);
    selectTemplate(id);
  };

  // 템플릿 삭제 핸들러
  const handleDeleteTemplate = (id: string) => {
    deleteTemplate(id);
  };

    // 템플릿 편집 화면에서 뒤로가기 핸들러
    const handleBackToList = () => {
        clearSelectedTemplate();
        setAddingNewTemplate(false);
    };

    // 선택된 템플릿이 있으면 편집 화면 표시
    if (selectedTemplateId) {
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4 px-6 pt-6">
              <button 
                onClick={handleBackToList}
                className="text-[#2D95CE] flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <Typography variant="body" className="text-[#2D95CE]">
                  템플릿 목록으로 돌아가기
                </Typography>
              </button>
            </div>
            <div className="flex-1">
              <AiTemplateEdit />
            </div>
          </div>
        );
    }
    
  return (
    <div className="flex flex-col">
        <div className="p-6">
            {/* 상단 안내 메시지 */}
            <div className="bg-white rounded-lg p-3 mb-6 text-center border max-w-xs mx-auto">
                <Typography variant="body" color="primary" className="text-[#2D95CE]">
                    원하시는 템플릿의 메일을 작성해 드립니다
                </Typography>
            </div>
            
            {/* 새 템플릿 추가 버튼 */}
            <AiTemplateAdd onClick={handleAddTemplate} />
            
            {/* 템플릿 목록 */}
            <div className="grid grid-cols-2 gap-4 pb-4">
            {templates.map(template => (
                <AiTemplateCell
                key={template.id}
                title={template.title}
                onClick={() => handleSelectTemplate(template.id)}
                onDelete={() => handleDeleteTemplate(template.id)}
                />
            ))}
            </div>
        </div>
    </div>
  );
};

export default AiTemplateList;