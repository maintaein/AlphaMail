package com.alphamail.api.email.application.service;

import java.util.List;

import com.alphamail.api.email.application.usecase.ai.EmailMCPUseCase;
import com.alphamail.api.email.application.usecase.ai.EmailVectorUseCase;
import com.alphamail.api.email.presentation.dto.AttachmentRequest;
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
public class ReceiveEmailService {

	private final EmailRepository emailRepository;
	private final LoadUserPort loadUserPort;
	private final EmailFolderRepository emailFolderRepository;
	private final EmailAttachmentRepository emailAttachmentRepository;

	private final EmailMCPUseCase emailMCPUseCase;
	private final EmailVectorUseCase emailVectorUseCase;

	public void excute(ReceiveEmailRequest request) {

//		if(request.attachments().get(0)!=null) {
//
//			for(AttachmentRequest attachment : request.attachments()) {
//				if(attachment.filename().contains("사업자 등록증")||
//					attachment.filename().contains("사업자등록증")){
//
//					//ocrusecase 작성
//				}
//			}
//		}

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

		//(비동기) 여기서 벡터 DB 저장 UserId & threadId & 메일 내용 조합해서 전달
		emailVectorUseCase.execute(request,userId.getValue(), threadId).subscribe();

		Email email = Email.createForReceiving(request, userId.getValue(), folderId, threadId);
		log.info("이메일 객체 생성: threadId={}", email.getThreadId());

		Email savedEmail = emailRepository.save(email);
		log.info("이메일 저장 완료: emailId={}", savedEmail.getEmailId());

		//(비동기) 여기서 MCP 호출 request에 있는 내용 조합 & emailId=105, userEmail=test3@alphamail.my
		emailMCPUseCase.execute(request,savedEmail.getEmailId()).subscribe();

		List<EmailAttachment> emailAttachmentList = EmailAttachment.createAttachments(
			request.attachments(),
			savedEmail.getEmailId()
		);

		if (!emailAttachmentList.isEmpty()) {
			emailAttachmentRepository.saveAll(emailAttachmentList);
		}
	}
}
