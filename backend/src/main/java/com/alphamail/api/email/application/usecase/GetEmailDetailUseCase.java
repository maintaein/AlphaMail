package com.alphamail.api.email.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.domain.repository.EmailAttachmentRepository;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.presentation.dto.EmailDetailResponse;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetEmailDetailUseCase {
	private final EmailRepository emailRepository;
	private final EmailAttachmentRepository emailAttachmentRepository;

	public EmailDetailResponse execute(Integer emailId, Integer userId) {
		Email email = emailRepository.findByIdAndUserId(emailId, userId)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));

		List<EmailAttachment> attachments = emailAttachmentRepository.findAllByEmailId(emailId);

		return EmailDetailResponse.from(email, attachments);
	}
}
