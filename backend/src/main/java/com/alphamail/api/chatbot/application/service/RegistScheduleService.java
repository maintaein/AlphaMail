package com.alphamail.api.chatbot.application.service;

import org.springframework.stereotype.Service;

import com.alphamail.api.chatbot.application.dto.ScheduleExtractionResult;
import com.alphamail.api.chatbot.infrastructure.prompt.LlmSchedulePrompt;
import com.alphamail.api.chatbot.presentation.dto.ChatBotResponse;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistScheduleService {

	private final LlmSchedulePrompt extractor;
	private final ObjectMapper objectMapper;

	public ChatBotResponse execute(Integer userId, String message) throws JsonProcessingException {

		ScheduleExtractionResult extracted;

		String json = extractor.makeScheduleToJson(message);
		extracted = objectMapper.readValue(json, ScheduleExtractionResult.class);

		CreateScheduleRequest schedule = new CreateScheduleRequest(
			extracted.name(), extracted.startTime(), extracted.endTime(), extracted.description());

		// 임시 스케쥴에 저장

		// response에 담아서 return
		return null;
	}
}
