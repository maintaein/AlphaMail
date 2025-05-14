package com.alphamail.api.email.domain.entity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import com.alphamail.api.email.domain.valueobject.ThreadId;
import com.alphamail.api.email.presentation.dto.ReceiveEmailRequest;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder(toBuilder = true)  // toBuilder=true 추가
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class Email {
	private Integer emailId;
	private Integer folderId;
	private Integer userId;
	private String messageId;
	private String sesMessageId;
	private String sender;
	private List<String> recipients;
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
			.messageId(null)
			.sender(request.sender())
			.recipients(request.recipients())
			.subject(request.subject())
			.bodyText(request.bodyText())
			.bodyHtml(request.bodyHtml())
			.sentDateTime(LocalDateTime.now())
			.hasAttachment(request.attachments() != null && !request.attachments().isEmpty())
			.inReplyTo(request.inReplyTo())
			.references(request.references())
			.threadId(null)
			.emailType(EmailType.SENT)
			.emailStatus(EmailStatus.RETRYING)
			.build();
	}


	public static Email createForReceiving(ReceiveEmailRequest request, Integer userId, Integer inboxFolderId, String threadId) {
		return Email.builder()
			.userId(userId)
			.folderId(inboxFolderId)
			.messageId(request.messageId())
			.sender(request.from())
			.recipients(request.to())
			.subject(request.subject())
			.bodyText(request.text())
			.bodyHtml(request.html())
			.receivedDateTime(request.date())
			.hasAttachment(request.attachments() != null && !request.attachments().isEmpty())
			.threadId(threadId)
			.emailType(EmailType.RECEIVED)
			.readStatus(false)
			.inReplyTo(request.inReplyTo())
			.references(request.references())
			.build();
	}


	// 읽음 처리 메서드
	public Email markAsRead() {
		return this.toBuilder()
			.readStatus(true)
			.build();
	}

	//references (String -> List)
	public List<String> parseReferences() {
		if (this.references == null || this.references.isEmpty()) {
			return Collections.emptyList();
		}
		return Arrays.asList(this.references.split("\\s+"));
	}

	public boolean hasValidThreadId() {
		return this.threadId != null && !this.threadId.isEmpty();
	}
}