package com.alphamail.api.email.application.usecase;

import org.springframework.stereotype.Service;

import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.user.application.usecase.port.LoadUserPort;
import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.presentation.dto.ReceiveEmailRequest;
import com.alphamail.api.user.domain.valueobject.UserId;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReceiveEmailUseCase {

	private final EmailRepository emailRepository;
	private final LoadUserPort loadUserPort;
	private final EmailFolderRepository emailFolderRepository;

	public void excute(ReceiveEmailRequest request) {
		String recipientEmail = request.actualRecipient();

		UserId userId = loadUserPort.loadUserIdByEmail(recipientEmail);

		Integer folderId = emailFolderRepository.getInboxFolderId(userId.getValue());

		Email email = Email.createForReceiving(request, userId.getValue(), folderId);

		emailRepository.save(email);
	}
}
