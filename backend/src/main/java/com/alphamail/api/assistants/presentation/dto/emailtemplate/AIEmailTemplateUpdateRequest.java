package com.alphamail.api.assistants.presentation.dto.emailtemplate;

import java.util.List;

public record AIEmailTemplateUpdateRequest(
	String title,
	List<AIEmailTemplateFieldRequest> fields,
	String context
) {
	public record AIEmailTemplateFieldRequest(String fieldName, String fieldValue) {
	}
}