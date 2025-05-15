import React, { useEffect, useState } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import AiTemplateItem from '../molecules/aiTemplateItem';
import AiTemplateItemAdd from '../molecules/aiTemplateItemAdd';
import { useAiStore } from '../../stores/useAiStore';

interface TemplateField {
  id: string;
  label: string;
  value: string;
}

const AiTemplateEdit: React.FC = () => {

    const { selectedTemplateId, isAddingNewTemplate } = useAiStore();
    const [fields, setFields] = useState<TemplateField[]>([]);
  
    useEffect(() => {
        if (isAddingNewTemplate) {
          // 새 템플릿 추가 시 제목 필드만 표시
          setFields([
            { id: '1', label: '제목', value: '새 템플릿' }
          ]);
        } else if (selectedTemplateId) {
          // 기존 템플릿 편집 시 모든 필드 표시
          setFields([
            { id: '1', label: '제목', value: '내가 만든 템플릿1' },
            { id: '2', label: '업무명', value: '' },
            { id: '3', label: '요청 사항', value: '' },
            { id: '4', label: '기한', value: '' },
            { id: '5', label: '주요 키워드', value: '' },
          ]);
        }
      }, [selectedTemplateId, isAddingNewTemplate]);
    
  const handleFieldChange = (id: string, value: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  };

  const handleAddField = () => {
    const newId = fields.length > 0 
      ? (parseInt(fields[fields.length - 1].id) + 1).toString()
      : '1';
    setFields([...fields, { id: newId, label: '새 항목', value: '' }]);
  };

  const handleLabelChange = (id: string, label: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, label } : field
    ));
  };  

  const handleDeleteField = (id: string) => {
    // 제목 필드는 삭제 불가능
    if (fields.find(field => field.id === id)?.label === '제목') {
      return;
    }
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div className="bg-[#E1F3FD] p-6 rounded-lg h-full">
      {/* 상단 안내 메시지 */}
      <div className="bg-white rounded-lg p-3 mb-6 text-center border border-[#2D95CE]">
        <Typography variant="body" className="text-[#2D95CE]">
          템플릿을 통해 메일을 생성해드릴게요
        </Typography>
      </div>
      
      {/* 템플릿 항목들 */}
      {fields.map(field => (
        <AiTemplateItem
          key={field.id}
          label={field.label}
          value={field.value}
          onChange={(value) => handleFieldChange(field.id, value)}
          onLabelChange={(label) => handleLabelChange(field.id, label)}
          onDelete={() => handleDeleteField(field.id)}
          showDeleteButton={field.label !== '제목'} // 제목 필드는 삭제 버튼 숨김
        />
      ))}
      
      {/* 항목 추가 버튼 */}
      <AiTemplateItemAdd onClick={handleAddField} />
    </div>
  );
};

export default AiTemplateEdit;