package com.alphamail.api.email.application.service;

import java.util.List;

import com.alphamail.api.email.application.usecase.SendEmailUseCase;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.alphamail.api.email.application.usecase.SaveEmailUseCase;
import com.alphamail.api.email.application.usecase.SaveSendAttachmentUseCase;
import com.alphamail.api.email.application.usecase.UpdateEmailUseCase;
import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.domain.valueobject.ThreadId;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
	private final SaveEmailUseCase saveEmailUseCase;
	private final SendEmailUseCase sendEmailUseCase;
	private final UpdateEmailUseCase updateEmailUseCase;
	private final SaveSendAttachmentUseCase saveSendAttachmentUseCase;
	private final EmailRepository emailRepository;

	@Transactional
	public void sendEmail(SendEmailRequest request, List<MultipartFile> attachments, Integer userId) {
		String threadId = null;

		// 답장인 경우 원본 이메일의 스레드 ID 찾기
		if (request.inReplyTo() != null && !request.inReplyTo().isEmpty()) {
			log.info("inReplyTo에서 원본 이메일 찾기: {}", request.inReplyTo());
			Email originalEmail = emailRepository.findByMessageId(request.inReplyTo());
			if (originalEmail != null && originalEmail.getThreadId() != null) {
				threadId = originalEmail.getThreadId();
				log.info("원본 이메일에서 스레드 ID 찾음: {}", threadId);
			}
		}

		Email email = saveEmailUseCase.execute(request, userId);

		// 답장인 경우 원본 스레드 ID 설정
		if (threadId != null) {
			emailRepository.updateThreadId(email.getEmailId(), threadId);
			// 객체 내의 스레드 ID도 업데이트
			email = email.toBuilder().threadId(threadId).build();
		}

		//request 체크 빈 배열이 들어올 가능성이 있다.
		if (attachments != null && !attachments.isEmpty()
			&& request.attachments() != null && !request.attachments().isEmpty()
			&& attachments.size() == request.attachments().size()) {
			saveSendAttachmentUseCase.execute(attachments, request.attachments(), email);
		}

		try {
			String sesResponseId = sendEmailUseCase.execute(email, attachments);
			emailRepository.updateSesMessageId(email.getEmailId(), sesResponseId);

			//ses-message-id가 실제 message-id의 도메인 주소 앞 부분과 일치해서 message-id를 ses-message-id를 통해 저장해주기
			String actualMessageId = "<" + sesResponseId + "@ap-northeast-2.amazonses.com>";

			// 새로운 이메일인 경우(답장이 아닌 경우)에만 메시지 ID로 스레드 ID 계산
			if (threadId == null) {
				// 메시지 ID로부터 스레드 ID 계산
				ThreadId calculatedThreadId = ThreadId.fromEmailHeaders(
					null,
					null,
					actualMessageId
				);
				threadId = calculatedThreadId.getValue();
				log.info("새 이메일 메시지 ID에서 스레드 ID 계산: {}", threadId);
			}

			emailRepository.updateMessageIdThreadIdAndStatus(
				email.getEmailId(),
				actualMessageId,
				threadId,
				EmailStatus.SENT
			);


		} catch (Exception e) {
			updateEmailUseCase.execute(email.getEmailId(), EmailStatus.FAILED);
			throw e;
		}
	}

}
