package com.alphamail.api.email.presentation.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailAttachment;

public record EmailDetailResponse(
	Integer id,
	String sender,
	List<String> recipients,
	String subject,
	String bodyText,
	String bodyHtml,
	LocalDateTime receivedDateTime,
	LocalDateTime sentDateTime,
	Boolean readStatus,
	Boolean hasAttachments,
	List<EmailAttachmentResponse> attachments,
	String messageId, //답장을 한다면 이걸 답장메일의 in-reply-to에 저장해야함
	String threadId,
	String inReplyTo,
	List<String> references,
	List<EmailThreadItem> threadEmails,
	String emailType

) {
	public static EmailDetailResponse from(Email email, List<EmailAttachment> attachments,
		List<EmailThreadItem> threadEmails) {

		List<EmailAttachmentResponse> attachmentResponses = attachments.stream()
			.map(EmailAttachmentResponse::from)
			.collect(Collectors.toList());

		List<String> referencesList = email.parseReferences();

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
			email.getMessageId(),
			email.getThreadId(),
			email.getInReplyTo(),
			referencesList,
			threadEmails,
			email.getEmailType().name()
		);
	}
}
