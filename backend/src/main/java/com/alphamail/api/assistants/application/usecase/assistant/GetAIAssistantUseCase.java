package com.alphamail.api.assistants.application.usecase.assistant;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.entity.TemporaryItemDto;
import com.alphamail.api.assistants.infrastructure.repository.assistant.TemporaryItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetAIAssistantUseCase {

	private final TemporaryItemRepository temporaryItemRepository;

	public List<TemporaryItemDto> execute(Integer userId) {
		List<Object[]> results = temporaryItemRepository.findAllTemporaryItemsByUserId(userId);

		return results.stream()
			.map(TemporaryItemDto::fromQueryResult)
			.collect(Collectors.toList());
	}
}
