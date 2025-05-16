package com.alphamail.api.assistants.presentation.dto.emailtemplate;

import java.util.List;

public record AIEmailTemplateCreateRequest(
	String title,
	List<TemplateField> fields,
	String generatedContent
) {
	public record TemplateField(
		String fieldName,  // 필드 이름 (예: "메일 목적", "업무명", "요청 사항" 등)
		String fieldValue  // 필드 값
	) {
	}
}