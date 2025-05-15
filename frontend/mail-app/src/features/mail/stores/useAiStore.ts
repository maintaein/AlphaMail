import { create } from 'zustand';

interface TemplateItem {
    id: string;
    title: string;
  }
  
interface AiState {
  // AI 어시스턴트 상태
  isAiAssistantOpen: boolean;
  
  // AI 분석 결과 및 상태
  isAnalyzing: boolean;
  analysisResult: string | null;
  
  // AI 번역 상태
  isTranslating: boolean;
  translatedContent: string | null;
  
    // 템플릿 관련 상태
  templates: TemplateItem[];
  selectedTemplateId: string | null;
  isAddingNewTemplate: boolean;

  // 액션
  openAiAssistant: () => void;
  closeAiAssistant: () => void;
  startAnalysis: () => void;
  setAnalysisResult: (result: string) => void;
  clearAnalysisResult: () => void;
  startTranslation: () => void;
  setTranslatedContent: (content: string) => void;
  clearTranslatedContent: () => void;
  selectTemplate: (id: string) => void;
  clearSelectedTemplate: () => void;
  addTemplate: (template: TemplateItem) => void;
  deleteTemplate: (id: string) => void;
  setAddingNewTemplate: (isAdding: boolean) => void;
}

export const useAiStore = create<AiState>((set) => ({
    // 초기 상태
    isAiAssistantOpen: false,
    isAnalyzing: false,
    analysisResult: null,
    isTranslating: false,
    translatedContent: null,
    isAddingNewTemplate: false,
    
    // 템플릿 초기 상태
    templates: [
      {
        id: '1',
        title: '계재보고서용 템플릿',
      },
      {
        id: '2',
        title: '내가 만든 템플릿',
      },
      {
        id: '3',
        title: '계재보고서용 템플릿',
      },
      {
        id: '4',
        title: '내가 만든 템플릿',
      }
    ],
    selectedTemplateId: null,
    
    // 액션
    openAiAssistant: () => set({ isAiAssistantOpen: true }),
    closeAiAssistant: () => set({ isAiAssistantOpen: false }),
    
    startAnalysis: () => set({ isAnalyzing: true }),
    setAnalysisResult: (result) => set({ analysisResult: result, isAnalyzing: false }),
    clearAnalysisResult: () => set({ analysisResult: null }),
    
    startTranslation: () => set({ isTranslating: true }),
    setTranslatedContent: (content) => set({ translatedContent: content, isTranslating: false }),
    clearTranslatedContent: () => set({ translatedContent: null }),
    
    // 템플릿 관련 액션
    selectTemplate: (id) => set({ selectedTemplateId: id }),
    clearSelectedTemplate: () => set({ selectedTemplateId: null }),
    addTemplate: (template) => set((state) => ({ 
      templates: [...state.templates, template] 
    })),
    deleteTemplate: (id) => set((state) => ({ 
      templates: state.templates.filter(template => template.id !== id) 
    })),
    setAddingNewTemplate: (isAdding: boolean) => set({ isAddingNewTemplate: isAdding }),
}));