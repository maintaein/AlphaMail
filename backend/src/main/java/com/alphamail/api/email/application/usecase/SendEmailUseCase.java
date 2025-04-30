package com.alphamail.api.email.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.port.EmailSenderPort;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SendEmailUseCase {

	private final EmailRepository emailRepository;
	private final EmailSenderPort emailSenderPort;
	private final EmailFolderRepository emailFolderRepository;

	public void execute(SendEmailRequest request, Integer userId) {

		Integer sentFolderId = emailFolderRepository.getSentFolderId(userId);
		Email email = Email.createForSending(request, userId, sentFolderId);

		Email savedEmail = emailRepository.save(email);

		try {
			emailSenderPort.send(savedEmail);

			Email updatedEmail = savedEmail.markAsSent();
			emailRepository.save(updatedEmail);

		} catch (Exception e) {
			// 실패 시 상태 업데이트
			Email failedEmail = savedEmail.markAsFailed();
			emailRepository.save(failedEmail);
			throw e;
		}
	}
}
