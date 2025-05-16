package com.alphamail.api.assistants.presentation.dto.emailtemplate;

import java.util.List;

public record AIEmailTemplateResponse(
	Integer Id,
	String title,
	List<AIEmailTemplateFieldResponse> fields,
	String generatedContent
) {
	public record AIEmailTemplateFieldResponse(
		String fieldName,
		String fieldValue
	) {
	}
}