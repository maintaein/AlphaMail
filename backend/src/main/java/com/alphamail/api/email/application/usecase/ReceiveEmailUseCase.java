package com.alphamail.api.email.application.usecase;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.domain.repository.EmailAttachmentRepository;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.domain.valueobject.ThreadId;
import com.alphamail.api.email.presentation.dto.ReceiveEmailRequest;
import com.alphamail.api.user.application.port.LoadUserPort;
import com.alphamail.api.user.domain.valueobject.UserId;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReceiveEmailUseCase {

	private final EmailRepository emailRepository;
	private final LoadUserPort loadUserPort;
	private final EmailFolderRepository emailFolderRepository;
	private final EmailAttachmentRepository emailAttachmentRepository;

	public void excute(ReceiveEmailRequest request) {

		log.info("이메일 수신 시작 - messageId: {}, inReplyTo: {}, references: {}",
			request.messageId(), request.inReplyTo(), request.references());


		String recipientEmail = request.actualRecipient();
		UserId userId = loadUserPort.loadUserIdByEmail(recipientEmail);
		Integer folderId = emailFolderRepository.getInboxFolderId(userId.getValue());

		String threadId = null;

		// inReplyTo를 사용해 원본 이메일 찾기
		if (request.inReplyTo() != null && !request.inReplyTo().isEmpty()) {
			log.info("inReplyTo에서 원본 이메일 찾기: {}", request.inReplyTo());
			Email originalEmail = emailRepository.findByMessageId(request.inReplyTo());
			if (originalEmail != null && originalEmail.getThreadId() != null) {
				threadId = originalEmail.getThreadId();
				log.info("원본 이메일에서 스레드 ID 찾음: {}", threadId);
			}
		}

		// 원본 이메일을 찾지 못한 경우에만 새로 계산
		if (threadId == null) {
			ThreadId calculatedThreadId = ThreadId.fromEmailHeaders(
				request.references(),
				request.inReplyTo(),
				request.messageId()
			);
			threadId = calculatedThreadId.getValue();
			log.info("계산된 스레드 ID 사용: {}", threadId);
		}

		Email email = Email.createForReceiving(request, userId.getValue(), folderId, threadId);
		log.info("이메일 객체 생성: threadId={}", email.getThreadId());

		Email savedEmail = emailRepository.save(email);
		log.info("이메일 저장 완료: emailId={}", savedEmail.getEmailId());

		List<EmailAttachment> emailAttachmentList = EmailAttachment.createAttachments(
			request.attachments(),
			savedEmail.getEmailId()
		);

		if (!emailAttachmentList.isEmpty()) {
			emailAttachmentRepository.saveAll(emailAttachmentList);
		}
	}
}
