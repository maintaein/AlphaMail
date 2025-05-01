package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;

public record EmailResponse(
	Integer id,
	String sender,
	String subject,
	LocalDateTime receivedDateTime,
	Integer size,
	Boolean readStatus
) {

}
