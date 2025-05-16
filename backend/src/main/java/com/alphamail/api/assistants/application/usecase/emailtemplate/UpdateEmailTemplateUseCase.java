package com.alphamail.api.assistants.application.usecase.emailtemplate;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;
import com.alphamail.api.assistants.domain.entity.EmailTemplateField;
import com.alphamail.api.assistants.domain.repository.EmailTemplateRepository;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateResponse;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateUpdateRequest;
import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.NotFoundException;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class UpdateEmailTemplateUseCase {

	private final EmailTemplateRepository emailTemplateRepository;
	private final ClaudeEmailTemplateGeneratorUseCase generatorUseCase;

	public AIEmailTemplateResponse execute(Integer templateId, Integer userId, AIEmailTemplateUpdateRequest request) {
		EmailTemplate template = emailTemplateRepository.findById(templateId);
		if (template == null || !template.getUserId().equals(userId)) {
			throw new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND);
		}

		List<EmailTemplateField> updatedFields = EmailTemplateField.fromUpdateRequests(request.fields());

		String htmlContent = generatorUseCase.generateHtmlContent(request.title(), updatedFields, request.userPrompt());

		template.update(request.title(), updatedFields, htmlContent);

		EmailTemplate saved = emailTemplateRepository.save(template);
		return saved.toResponse();
	}
}