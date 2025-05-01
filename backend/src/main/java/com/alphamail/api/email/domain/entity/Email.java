package com.alphamail.api.email.domain.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Email {
	private Integer emailId;
	private Integer folderId;
	private Integer userId;
	private String messageId;
	private String sender;
	private String recipients;
	private String subject;
	private String bodyText;
	private String bodyHtml;
	private LocalDateTime receivedDateTime;
	private LocalDateTime sentDateTime;
	private Boolean readStatus;
	private Boolean hasAttachment;
	private String inReplyTo;
	private String references;
	private String threadId;
	private String filePath;
	private EmailType emailType; // SENT, RECEIVED
	private EmailStatus emailStatus; // SENT, FAILED, RETRYING
	private Integer originalFolderId;

	// 발송용 이메일 생성 정적 팩토리 메서드
	public static Email createForSending(SendEmailRequest request, Integer userId, Integer sentFolderId) {

		return Email.builder()
			.folderId(sentFolderId)
			.userId(userId)
			.messageId(generateMessageId())
			.sender(request.sender())
			.recipients(String.join(",", request.recipients()))
			.subject(request.subject())
			.bodyText(request.bodyText())
			.bodyHtml(request.bodyHtml())
			.sentDateTime(LocalDateTime.now())
			.hasAttachment(request.attachments() != null && !request.attachments().isEmpty())
			.inReplyTo(request.inReplyTo())
			.references(request.references() != null ? String.join(",", request.references()) : null)
			.threadId(generateThreadId(request.inReplyTo()))
			.emailType(EmailType.SENT)
			.emailStatus(EmailStatus.RETRYING)
			.build();
	}

	// MessageId 생성 메서드
	private static String generateMessageId() {
		return "<" + UUID.randomUUID().toString() + "@alphamail.my>";
	}

	// ThreadId 생성 메서드
	private static String generateThreadId(String inReplyTo) {
		// inReplyTo가 있으면 해당 스레드의 일부로 처리
		if (inReplyTo != null && !inReplyTo.isEmpty()) {
			return inReplyTo.replaceAll("[<>]", "").split("@")[0];
		}
		return UUID.randomUUID().toString();
	}

}
