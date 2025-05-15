package com.alphamail.api.assistants.application.usecase.client;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;
import com.alphamail.api.assistants.domain.repository.TemporaryClientRepository;
import com.alphamail.api.assistants.domain.service.EmailReader;
import com.alphamail.api.assistants.presentation.dto.client.TemporaryClientRequest;
import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.user.application.port.LoadUserPort;
import com.alphamail.api.user.domain.valueobject.UserId;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CreateTemporaryClientUseCase {

	private final TemporaryClientRepository temporaryClientRepository;
	private final LoadUserPort loadUserPort;
	private final EmailReader emailReader;

	public void execute(TemporaryClientRequest temporaryClientRequest) {

		UserId userId = loadUserPort.loadUserIdByEmail(temporaryClientRequest.receivedEmail());

		Email email = emailReader.findByIdAndUserId(temporaryClientRequest.emailId(), userId.getValue());

		TemporaryClient temporaryClient = TemporaryClient.from(temporaryClientRequest, userId.getValue(), email);

		temporaryClientRepository.save(temporaryClient);

	}
}
