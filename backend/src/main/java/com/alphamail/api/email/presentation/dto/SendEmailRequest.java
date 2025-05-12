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
	String references
) {

	public record Attachment(
		String name,
		Long size,
		String type
	) {
	}
}
