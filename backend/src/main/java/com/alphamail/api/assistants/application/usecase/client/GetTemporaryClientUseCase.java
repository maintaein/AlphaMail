package com.alphamail.api.assistants.application.usecase.client;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;
import com.alphamail.api.assistants.domain.repository.TemporaryClientRepository;
import com.alphamail.api.assistants.presentation.dto.client.TemporaryClientResponse;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.ForbiddenException;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetTemporaryClientUseCase {

	private final TemporaryClientRepository temporaryClientRepository;

	public TemporaryClientResponse execute(Integer temporaryClientId, Integer userId) {

		TemporaryClient temporaryClient = temporaryClientRepository.findById(temporaryClientId)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));

		// user가 같은지 반환
		if (!temporaryClient.getUserId().equals(userId)) {
			throw new ForbiddenException(ErrorMessage.ACCESS_DENIED);
		}

		return TemporaryClientResponse.from(temporaryClient);

	}
}
