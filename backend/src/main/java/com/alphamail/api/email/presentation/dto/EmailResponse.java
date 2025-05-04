package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
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
