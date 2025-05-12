package com.alphamail.api.email.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alphamail.api.email.application.usecase.SaveEmailUseCase;
import com.alphamail.api.email.application.usecase.SaveSendAttachmentUseCase;
import com.alphamail.api.email.application.usecase.SendEmailUseCase;
import com.alphamail.api.email.application.usecase.UpdateEmailUseCase;
import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SendEmailService {
	private final SaveEmailUseCase saveEmailUseCase;
	private final SendEmailUseCase sendEmailUseCase;
	private final UpdateEmailUseCase updateEmailUseCase;
	private final SaveSendAttachmentUseCase saveSendAttachmentUseCase;

	public void sendEmail(SendEmailRequest request, List<MultipartFile> attachments, Integer userId) {

		Email email = saveEmailUseCase.execute(request, userId);

		//request 체크 빈 배열이 들어올 가능성이 있다.
		if (attachments != null && !attachments.isEmpty()
			&& request.attachments() != null && !request.attachments().isEmpty()
			&& attachments.size() == request.attachments().size()) {
			saveSendAttachmentUseCase.execute(attachments, request.attachments(), email);
		}

		try {
			sendEmailUseCase.execute(email, attachments);
			updateEmailUseCase.execute(email.getEmailId(), EmailStatus.SENT);

		} catch (Exception e) {
			updateEmailUseCase.execute(email.getEmailId(), EmailStatus.FAILED);
			throw e;
		}
	}

}
