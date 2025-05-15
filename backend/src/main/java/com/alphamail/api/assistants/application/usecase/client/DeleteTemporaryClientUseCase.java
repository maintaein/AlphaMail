package com.alphamail.api.assistants.application.usecase.client;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;
import com.alphamail.api.assistants.domain.repository.TemporaryClientRepository;
import com.alphamail.common.exception.ErrorMessage;
import com.alphamail.common.exception.ForbiddenException;
import com.alphamail.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DeleteTemporaryClientUseCase {

	private final TemporaryClientRepository temporaryClientRepository;

	@Transactional
	public void execute(Integer temporaryClientId, Integer userId) {
		TemporaryClient temporaryClient = temporaryClientRepository.findById(temporaryClientId)
			.orElseThrow(() -> new NotFoundException(ErrorMessage.RESOURCE_NOT_FOUND));

		if (!temporaryClient.getUserId().equals(userId)) {
			throw new ForbiddenException(ErrorMessage.ACCESS_DENIED);
		}

		temporaryClientRepository.deleteById(temporaryClientId);
	}
}
