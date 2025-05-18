package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;

public record EmailThreadItem(
	Integer emailId,
	String sender,
	String subject,
	LocalDateTime dateTime,
	Integer originalFolderId,
	String folderName
) {
}
