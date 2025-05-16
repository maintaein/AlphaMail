package com.alphamail.api.assistants.presentation.dto.emailtemplate;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;

public record SimpleEmailTemplateResponse(
	Integer id,
	String title
) {
	public static SimpleEmailTemplateResponse from(EmailTemplate template) {
		return new SimpleEmailTemplateResponse(template.getId(), template.getTitle());
	}
}