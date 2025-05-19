package com.alphamail.api.chatbot.application.service;

import java.time.LocalDateTime;
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

	public ChatBotResponse execute(Integer userId, String message, String timezone, LocalDateTime userTime) {
		ClaudeCreateSchedule response = extractor.makeScheduleToJson(message, timezone, userTime);

		if (response == null) {
			return ChatBotResponse.defaultResponse();
		}

		return new ChatBotResponse(response.reply(), List.of(), DocumentTypes.TMP_SCHEDULE, response.content());

	}
}
