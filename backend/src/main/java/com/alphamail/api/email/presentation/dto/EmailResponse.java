package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;


public record EmailResponse(
	Integer id,
	String sender,
	String subject,
	LocalDateTime receivedDateTime,
	LocalDateTime sentDateTime,
	Integer size,
	Boolean readStatus,
	Integer originalFolderId,
	List<String> recipients

) {
	public static EmailResponse withoutRecipients(
		Integer id,
		String sender,
		String subject,
		LocalDateTime receivedDateTime,
		LocalDateTime sentDateTime,
		Integer size,
		Boolean readStatus,
		Integer originalFolderId
	) {
		return new EmailResponse(id, sender, subject, receivedDateTime, sentDateTime, size, readStatus, originalFolderId, null);
	}

}
