package com.alphamail.api.assistants.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.assistants.application.usecase.client.CreateTemporaryClientUseCase;
import com.alphamail.api.assistants.application.usecase.client.DeleteTemporaryClientUseCase;
import com.alphamail.api.assistants.application.usecase.client.GetTemporaryClientUseCase;
import com.alphamail.api.assistants.application.usecase.client.RegisterTemporaryClientUseCase;
import com.alphamail.api.assistants.application.usecase.client.UpdateTemporaryClientUseCase;
import com.alphamail.api.assistants.presentation.dto.client.RegisterClientRequest;
import com.alphamail.api.assistants.presentation.dto.client.TemporaryClientRequest;
import com.alphamail.api.assistants.presentation.dto.client.TemporaryClientResponse;
import com.alphamail.api.assistants.presentation.dto.client.UpdateTemporaryClientRequest;
import com.alphamail.common.annotation.Auth;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiPaths.ASSISTANTS_BASE_API + ApiPaths.CLIENTS_BASE_API)
public class TemporaryClientController {

	private final CreateTemporaryClientUseCase createTemporaryClientUseCase;
	private final RegisterTemporaryClientUseCase registerTemporaryClientUseCase;
	private final GetTemporaryClientUseCase getTemporaryClientUseCase;
	private final UpdateTemporaryClientUseCase updateTemporaryClientUseCase;
	private final DeleteTemporaryClientUseCase deleteTemporaryClientUseCase;

	@PostMapping
	public ResponseEntity<Void> addTemporaryClient(@RequestBody TemporaryClientRequest temporaryClientRequest) {
		createTemporaryClientUseCase.execute(temporaryClientRequest);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{temporaryClientId}")
	public ResponseEntity<TemporaryClientResponse> getTemporaryClient(
		@PathVariable Integer temporaryClientId, @Auth Integer userId) {
		TemporaryClientResponse temporaryClientResponse = getTemporaryClientUseCase.execute(temporaryClientId, userId);
		return ResponseEntity.ok(temporaryClientResponse);
	}

	@PatchMapping("/update/{temporaryClientId}")
	public ResponseEntity<TemporaryClientResponse> updateTemporaryClient(
		@PathVariable Integer temporaryClientId,
		@RequestBody UpdateTemporaryClientRequest updateTemporaryClientRequest,
		@Auth Integer userId) {
		TemporaryClientResponse temporaryClientResponse = updateTemporaryClientUseCase.execute(
			updateTemporaryClientRequest, userId, temporaryClientId);
		return ResponseEntity.ok(temporaryClientResponse);
	}

	//GetMapping 어떻게 넣을지 고민
	@PostMapping("/register")
	public ResponseEntity<Void> registerClientFromTemporary(
		@RequestBody RegisterClientRequest registerClientRequest, @Auth Integer userId) {
		registerTemporaryClientUseCase.execute(registerClientRequest, userId);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{temporaryClientId}")
	public ResponseEntity<Void> deleteTemporaryClient(
		@PathVariable Integer temporaryClientId,
		@Auth Integer userId) {
		deleteTemporaryClientUseCase.execute(temporaryClientId, userId);
		return ResponseEntity.noContent().build();
	}
}
