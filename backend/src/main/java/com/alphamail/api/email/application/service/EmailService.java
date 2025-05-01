package com.alphamail.api.email.application.service;

import org.springframework.stereotype.Service;

import com.alphamail.api.email.application.usecase.GetEmailUseCase;
import com.alphamail.api.email.application.usecase.SaveEmailUseCase;
import com.alphamail.api.email.application.usecase.SendEmailUseCase;
import com.alphamail.api.email.application.usecase.UpdateEmailUseCase;
import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;
import com.alphamail.api.email.presentation.dto.EmailListResponse;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	private final SaveEmailUseCase saveEmailUseCase;
	private final SendEmailUseCase sendEmailUseCase;
	private final UpdateEmailUseCase updateEmailUseCase;

	public void sendEmail(SendEmailRequest request, Integer userId) {
		Email email = saveEmailUseCase.execute(request, userId);

		try {
			sendEmailUseCase.execute(email);
			updateEmailUseCase.execute(email.getEmailId(), EmailStatus.SENT);

		}catch (Exception e) {
			updateEmailUseCase.execute(email.getEmailId(), EmailStatus.FAILED);
			throw e;
		}
	}

}
