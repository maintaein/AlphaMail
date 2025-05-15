package com.alphamail.api.assistants.application.usecase.client;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;
import com.alphamail.api.assistants.domain.repository.TemporaryClientRepository;
import com.alphamail.api.assistants.presentation.dto.TemporaryClientRequest;
import com.alphamail.api.user.application.port.LoadUserPort;
import com.alphamail.api.user.domain.valueobject.UserId;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateTemporaryClientUseCase {

	private final TemporaryClientRepository temporaryClientRepository;
	private final LoadUserPort loadUserPort;

	public void execute(TemporaryClientRequest temporaryClientRequest) {
		UserId userId = loadUserPort.loadUserIdByEmail(temporaryClientRequest.email());
		TemporaryClient temporaryClient = TemporaryClient.from(temporaryClientRequest, userId.getValue());
		temporaryClientRepository.save(temporaryClient);
	}

}
