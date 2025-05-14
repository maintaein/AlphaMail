package com.alphamail.api.email.application.usecase;

import java.util.List;

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

		log.debug("이메일 내용: inReplyTo={}, references={}",
			request.inReplyTo(), request.references());

		String recipientEmail = request.actualRecipient();
		UserId userId = loadUserPort.loadUserIdByEmail(recipientEmail);
		Integer folderId = emailFolderRepository.getInboxFolderId(userId.getValue());

		ThreadId threadId = ThreadId.fromEmailHeaders(
			request.references(),
			request.inReplyTo(),
			request.messageId()
		);
		Email email = Email.createForReceiving(request, userId.getValue(), folderId, threadId.getValue());
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
