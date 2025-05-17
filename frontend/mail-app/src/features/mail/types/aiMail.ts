// AI 메일 템플릿 관련 타입 정의
export interface EmailTemplate {
    id: number;
    title: string;
    content?: string;
    userPrompt?: string;
    fields?: EmailTemplateField[];
    generatedContent?: string;
}

export interface EmailTemplateRequest {
    title: string;
    content?: string;
    userPrompt?: string;
    fields?: EmailTemplateField[];
}

export interface EmailTemplateField {
    id?: string;
    fieldName: string;
    fieldValue: string;
    label?: string;
    value?: string;
}