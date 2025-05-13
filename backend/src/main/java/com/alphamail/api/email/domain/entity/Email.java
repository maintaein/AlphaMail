package com.alphamail.api.email.domain.entity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

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

		String threadId;

		if (request.inReplyTo() != null || request.references() != null) {
			// 답장인 경우: 기존 대화의 스레드 ID 사용
			threadId = generateThreadId(request.inReplyTo(), request.references());
		} else {
			// 새 이메일인 경우: 메시지 ID에서 UUID 부분 추출하여 스레드 ID로 사용
			threadId = UUID.randomUUID().toString();
		}

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
			.threadId(threadId)
			.emailType(EmailType.SENT)
			.emailStatus(EmailStatus.RETRYING)
			.build();
	}


	// ThreadId 생성 메서드
	private static String generateThreadId(String inReplyTo, String references) {
		// 1. 답장인 경우
		if (inReplyTo != null && !inReplyTo.isEmpty()) {
			return extractIdFromEmailId(inReplyTo);
		}
		// 2. references가 있는 경우 (첫 번째 참조가 스레드의 시작점)
		if (references != null && !references.isEmpty()) {
			String[] refsArray = references.split("\\s+");
			if (refsArray.length > 0) {
				return extractIdFromEmailId(refsArray[0]);
			}
		}

		return UUID.randomUUID().toString();
	}

	private static String extractIdFromEmailId(String emailId) {
		String cleanId = emailId.replaceAll("[<>]", "").split("@")[0];

		try {
			UUID.fromString(cleanId);
			return cleanId;  // 유효한 UUID면 그대로 반환
		} catch (IllegalArgumentException e) {
			// UUID가 아니면 해당 문자열의 해시코드를 이용해 UUID 생성
			// 같은 입력에 대해 항상 같은 값 반환
			return new UUID(cleanId.hashCode(), 0).toString();
		}
	}

	public static Email createForReceiving(ReceiveEmailRequest request, Integer userId, Integer inboxFolderId) {
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
			.threadId(generateThreadId(request.inReplyTo(), request.references()))
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