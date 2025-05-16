package com.alphamail.api.assistants.application.usecase.emailtemplate;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;
import com.alphamail.api.assistants.domain.repository.EmailTemplateRepository;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateResponse;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Service
@RequiredArgsConstructor
public class GetEmailTemplateUseCase {

	private final EmailTemplateRepository emailTemplateRepository;

	public AIEmailTemplateResponse execute(Integer templateId, Integer userId) {
		EmailTemplate template = emailTemplateRepository.findById(templateId);

		if (template == null || !template.getUserId().equals(userId)) {
			throw new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND);
		}

		return template.toResponse();
	}
}