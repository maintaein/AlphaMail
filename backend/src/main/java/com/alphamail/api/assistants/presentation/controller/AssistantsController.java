package com.alphamail.api.assistants.presentation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.alphamail.api.assistants.application.usecase.assistant.GetAIAssistantUseCase;
import com.alphamail.api.assistants.domain.entity.TemporaryItemDto;
import com.alphamail.common.annotation.Auth;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiPaths.ASSISTANTS_BASE_API)
public class AssistantsController {

	private final GetAIAssistantUseCase getAIAssistantUseCase;

	@GetMapping
	public ResponseEntity<List<TemporaryItemDto>> getAIAssistants(@Auth Integer userId) {
		List<TemporaryItemDto> temporaryItems = getAIAssistantUseCase.execute(userId);
		return ResponseEntity.ok(temporaryItems);
	}


}
