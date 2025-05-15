package com.alphamail.api.chatbot.application.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.alphamail.api.chatbot.application.dto.ClaudeReply;
import com.alphamail.api.chatbot.domain.handler.SummarizePromptHandler;
import com.alphamail.api.chatbot.infrastructure.vector.VectorSearchClient;
import com.alphamail.api.chatbot.presentation.dto.ChatBotResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchDocumentService {

	private final VectorSearchClient vectorSearchClient;
	private final ObjectMapper objectMapper;
	private final Map<String, SummarizePromptHandler> handlerMap;

	public ChatBotResponse execute(String documentType, Integer ownerId, Integer userId, String message) {
		List<Map<String, String>> matched = vectorSearchClient.searchByEmbedding(documentType, ownerId, userId, message);

		SummarizePromptHandler handler = handlerMap.get(documentType);

		String claudeResponse = handler.generateReply(message, matched);
		try {
			ClaudeReply parsed = objectMapper.readValue(claudeResponse, ClaudeReply.class);

			String reply = parsed.reply();
			List<Integer> ids = parsed.ids().stream()
				.map(Integer::parseInt)
				.toList();
			return new ChatBotResponse(reply, ids, documentType);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("JSON 파싱 실패", e);
		}
	}
}
