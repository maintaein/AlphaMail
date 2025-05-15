package com.alphamail.api.assistants.presentation.controller;

import java.util.List;

import com.alphamail.api.assistants.application.usecase.SaveVectorDBUseCase;
import com.alphamail.api.assistants.application.usecase.assistant.GetAIAssistantUseCase;
import com.alphamail.api.assistants.domain.entity.TemporaryItemDto;
import com.alphamail.api.assistants.presentation.dto.SendEmailRequest;
import com.alphamail.common.annotation.Auth;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiPaths.ASSISTANTS_BASE_API)
public class AssistantsController {

	private final SaveVectorDBUseCase saveVectorDBUseCase;
	private final GetAIAssistantUseCase getAIAssistantUseCase;

	@GetMapping
	public ResponseEntity<List<TemporaryItemDto>> getAIAssistants(@Auth Integer userId) {
		List<TemporaryItemDto> temporaryItems = getAIAssistantUseCase.execute(userId);
		return ResponseEntity.ok(temporaryItems);
	}

	@PostMapping("/vector/test")
	public ResponseEntity<Void> saveVectorCB(@RequestBody SendEmailRequest sendEmailRequest, @Auth Integer userId) {

		saveVectorDBUseCase.execute("thread_id_001", userId, sendEmailRequest.bodyText());

		return ResponseEntity.ok().build();
	}

}
