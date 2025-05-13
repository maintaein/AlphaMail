package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;


public record EmailResponse(
	Integer id,
	String sender,
	String subject,
	LocalDateTime receivedDateTime,
	LocalDateTime sentDateTime,
	Integer size,
	Boolean readStatus,
	Integer originalFolderId

) {

}
