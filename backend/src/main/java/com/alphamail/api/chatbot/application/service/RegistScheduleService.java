package com.alphamail.api.chatbot.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alphamail.api.chatbot.application.dto.ClaudeCreateSchedule;
import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.chatbot.infrastructure.prompt.CreateSchedulePrompt;
import com.alphamail.api.chatbot.presentation.dto.ChatBotResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegistScheduleService {

	private final CreateSchedulePrompt extractor;
	private final ObjectMapper objectMapper;

	public ChatBotResponse execute(Integer userId, String message) {
		ClaudeCreateSchedule response = extractor.makeScheduleToJson(message);

		if (response == null) {
			return ChatBotResponse.defaultResponse();
		}

		return new ChatBotResponse(response.reply(), List.of(), DocumentTypes.TMP_SCHEDULE, response.content());

	}
}
