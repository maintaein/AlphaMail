package com.alphamail.api.assistants.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.assistants.application.usecase.client.CreateTemporaryClientUseCase;
import com.alphamail.api.assistants.presentation.dto.TemporaryClientRequest;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiPaths.ASSISTANTS_BASE_API + ApiPaths.CLIENTS_BASE_API)
public class TemporaryClientController {

	private final CreateTemporaryClientUseCase createTemporaryClientUseCase;

	@PostMapping
	public ResponseEntity<Void> addTemporarySchedule(@RequestBody TemporaryClientRequest temporaryClientRequest) {

		createTemporaryClientUseCase.execute(temporaryClientRequest);

		return ResponseEntity.ok().build();
	}

}
