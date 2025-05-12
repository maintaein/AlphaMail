package com.alphamail.api.email.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.port.EmailSenderPort;
import com.alphamail.api.email.domain.repository.EmailFolderRepository;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SaveEmailUseCase {

	private final EmailRepository emailRepository;
	private final EmailFolderRepository emailFolderRepository;

	public Email execute(SendEmailRequest request, Integer userId) {

		Integer sentFolderId = emailFolderRepository.getSentFolderId(userId);
		Email email = Email.createForSending(request, userId, sentFolderId );
		return emailRepository.save(email);

	}
}
