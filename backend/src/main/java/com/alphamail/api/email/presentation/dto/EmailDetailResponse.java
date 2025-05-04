package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailAttachment;

public record EmailDetailResponse(
	Integer id,
	String sender,
	String recipients,
	String subject,
	String bodyText,
	String bodyHtml,
	LocalDateTime receivedDateTime,
	LocalDateTime sentDateTime,
	Boolean readStatus,
	Boolean hasAttachments,
	List<EmailAttachmentResponse> attachments,
	String threadId,
	String inReplyTo,
	String emailType

) {
	public static EmailDetailResponse from(Email email, List<EmailAttachment> attachments) {

		List<EmailAttachmentResponse> attachmentResponses = attachments.stream()
			.map(EmailAttachmentResponse::from)
			.collect(Collectors.toList());

		return new EmailDetailResponse(
			email.getEmailId(),
			email.getSender(),
			email.getRecipients(),
			email.getSubject(),
			email.getBodyText(),
			email.getBodyHtml(),
			email.getReceivedDateTime(),
			email.getSentDateTime(),
			email.getReadStatus(),
			email.getHasAttachment(),
			attachmentResponses,
			email.getThreadId(),
			email.getInReplyTo(),
			email.getEmailType().name()
		);
	}
}
