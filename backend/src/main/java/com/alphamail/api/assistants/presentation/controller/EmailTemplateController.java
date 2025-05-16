package com.alphamail.api.assistants.presentation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.assistants.application.usecase.emailtemplate.CreateEmailTemplateUseCase;
import com.alphamail.api.assistants.application.usecase.emailtemplate.DeleteEmailTemplateUseCase;
import com.alphamail.api.assistants.application.usecase.emailtemplate.GetAllEmailTemplatesUseCase;
import com.alphamail.api.assistants.application.usecase.emailtemplate.GetEmailTemplateUseCase;
import com.alphamail.api.assistants.application.usecase.emailtemplate.UpdateEmailTemplateUseCase;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateCreateRequest;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateResponse;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateUpdateRequest;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.SimpleEmailTemplateResponse;
import com.alphamail.common.annotation.Auth;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiPaths.ASSISTANTS_BASE_API + ApiPaths.EMAIL_TEMPLATE_BASE_API)
public class EmailTemplateController {

	private final CreateEmailTemplateUseCase createEmailTemplateUseCase;
	private final GetEmailTemplateUseCase getEmailTemplateUseCase;
	private final UpdateEmailTemplateUseCase updateEmailTemplateUseCase;
	private final DeleteEmailTemplateUseCase deleteEmailTemplateUseCase;
	private final GetAllEmailTemplatesUseCase getAllEmailTemplatesUseCase;

	@GetMapping
	public ResponseEntity<List<SimpleEmailTemplateResponse>> getAllEmailTemplates(
		@Auth Integer userId
	) {
		List<SimpleEmailTemplateResponse> response = getAllEmailTemplatesUseCase.execute(userId);
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<AIEmailTemplateResponse> createEmailTemplate(
		@RequestBody AIEmailTemplateCreateRequest request,
		@Auth Integer userId) {
		AIEmailTemplateResponse response = createEmailTemplateUseCase.execute(request, userId);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{email-template-id}")
	public ResponseEntity<AIEmailTemplateResponse> getEmailTemplate(
		@PathVariable("email-template-id") Integer emailTemplateId,
		@Auth Integer userId
	) {
		AIEmailTemplateResponse response = getEmailTemplateUseCase.execute(emailTemplateId, userId);
		return ResponseEntity.ok(response);
	}

	@PutMapping("/{email-template-id}")
	public ResponseEntity<AIEmailTemplateResponse> updateEmailTemplate(
		@PathVariable("email-template-id") Integer emailTemplateId,
		@RequestBody AIEmailTemplateUpdateRequest request,
		@Auth Integer userId
	) {
		AIEmailTemplateResponse response = updateEmailTemplateUseCase.execute(emailTemplateId, userId, request);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{email-template-id}")
	public ResponseEntity<Void> deleteEmailTemplate(
		@PathVariable("email-template-id") Integer emailTemplateId,
		@Auth Integer userId
	) {
		deleteEmailTemplateUseCase.execute(emailTemplateId, userId);
		return ResponseEntity.noContent().build(); // 204 No Content
	}
}
