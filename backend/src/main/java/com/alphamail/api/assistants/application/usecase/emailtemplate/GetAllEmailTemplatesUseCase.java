package com.alphamail.api.assistants.application.usecase.emailtemplate;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.repository.EmailTemplateRepository;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.SimpleEmailTemplateResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetAllEmailTemplatesUseCase {

	private final EmailTemplateRepository emailTemplateRepository;

	public List<SimpleEmailTemplateResponse> execute(Integer userId) {
		return emailTemplateRepository.findByUserId(userId).stream()
			.map(SimpleEmailTemplateResponse::from)
			.toList();
	}
}