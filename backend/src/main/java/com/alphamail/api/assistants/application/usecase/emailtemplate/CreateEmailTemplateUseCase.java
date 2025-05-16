package com.alphamail.api.assistants.application.usecase.emailtemplate;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;
import com.alphamail.api.assistants.domain.entity.EmailTemplateField;
import com.alphamail.api.assistants.domain.repository.EmailTemplateRepository;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateCreateRequest;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class CreateEmailTemplateUseCase {

	private final EmailTemplateRepository emailTemplateRepository;
	private final ClaudeEmailTemplateGeneratorUseCase generatorUseCase;

	public AIEmailTemplateResponse execute(AIEmailTemplateCreateRequest request, Integer userId) {
		List<EmailTemplateField> fields = EmailTemplateField.fromCreateRequests(request.fields());

		String htmlContent = generatorUseCase.generateHtmlContent(request.title(), fields, request.userPrompt());

		EmailTemplate emailTemplate = EmailTemplate.createFromRequest(userId, request, htmlContent);
		EmailTemplate saved = emailTemplateRepository.save(emailTemplate);

		return saved.toResponse();
	}
}