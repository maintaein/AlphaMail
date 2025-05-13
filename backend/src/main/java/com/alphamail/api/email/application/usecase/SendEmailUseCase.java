package com.alphamail.api.email.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.domain.port.EmailSenderPort;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SendEmailUseCase {
	private final EmailSenderPort emailSenderPort;

	public String execute(Email email, List<MultipartFile> multipartFilesAttachments) {
		return emailSenderPort.send(email, multipartFilesAttachments);
	}
}
