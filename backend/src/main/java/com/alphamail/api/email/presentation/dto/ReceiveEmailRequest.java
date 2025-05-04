package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ReceiveEmailRequest(
	String from,
	List<String> to,
	String subject,
	String text,
	String html,
	String messageId,
	LocalDateTime date,
	String actualRecipient,
	List<AttachmentRequest> attachments
) {

}
