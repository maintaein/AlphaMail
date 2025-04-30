package com.alphamail.api.email.presentation.dto;

import java.util.List;

public record SendEmailRequest(
	String sender,
	List<String> recipients,
	String subject,
	String bodyText,
	String bodyHtml,
	List<Attachment> attachments,
	String inReplyTo,
	List<String> references
) {

	public record Attachment(
		Long attachments_id
	) {
	}
}
