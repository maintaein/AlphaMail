package com.alphamail.api.assistants.application.usecase.emailtemplate;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;
import com.alphamail.api.assistants.domain.repository.EmailTemplateRepository;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeleteEmailTemplateUseCase {

	private final EmailTemplateRepository emailTemplateRepository;

	public void execute(Integer templateId, Integer userId) {
		EmailTemplate template = emailTemplateRepository.findById(templateId);
		if (template == null || !template.getUserId().equals(userId)) {
			throw new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND);
		}
		emailTemplateRepository.deleteById(templateId);
	}
}
