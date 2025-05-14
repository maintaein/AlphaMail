package com.alphamail.api.chatbot.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alphamail.api.chatbot.application.dto.ChatBotResult;
import com.alphamail.api.chatbot.infrastructure.adapter.VectorSearchClient;
import com.alphamail.api.chatbot.infrastructure.prompt.SummarizeSchedulePrompt;
import com.alphamail.api.chatbot.presentation.dto.ChatBotRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchScheduleService {

	private final VectorSearchClient vectorSearchClient;
	private final SummarizeSchedulePrompt summarizeSchedulePrompt;

	public ChatBotResult searchWithSummary(ChatBotRequest request) {
		List<String> matched = vectorSearchClient.searchByEmbedding(request.userId(), request.message());

		return ChatBotResult.complete(summarizeSchedulePrompt.generateResult(matched));
	}

}
