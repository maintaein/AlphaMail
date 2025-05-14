package com.alphamail.api.chatbot.application.service;

import org.springframework.stereotype.Service;

import com.alphamail.api.chatbot.application.dto.ChatBotResult;
import com.alphamail.api.chatbot.application.dto.ScheduleExtractionResult;
import com.alphamail.api.chatbot.infrastructure.prompt.LlmSchedulePrompt;
import com.alphamail.api.chatbot.presentation.dto.ChatBotRequest;
import com.alphamail.api.schedule.application.usecase.CreateScheduleUseCase;
import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;
import com.alphamail.common.exception.ErrorMessage;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistScheduleService {

	private final LlmSchedulePrompt extractor;
	private final CreateScheduleUseCase createScheduleUseCase;
	private final ObjectMapper objectMapper;

	public ChatBotResult execute(ChatBotRequest request) {
		Integer userId = request.userId();
		String message = request.message();

		ScheduleExtractionResult extracted;
		try {
			String json = extractor.makeScheduleToJson(message);
			extracted = objectMapper.readValue(json, ScheduleExtractionResult.class);
		} catch (Exception e) {
			return ChatBotResult.followUp(ErrorMessage.NO_CHATBOT_RESULT.getMessage());
		}

		if (extracted.name() == null) {
			return ChatBotResult.followUp(ErrorMessage.NO_SCHEDULE_NAME.getMessage());
		} else if (extracted.startTime() == null) {
			return ChatBotResult.followUp(ErrorMessage.NO_SCHEDULE_START_TIME.getMessage());
		} else if (extracted.endTime() == null) {
			return ChatBotResult.followUp(ErrorMessage.NO_SCHEDULE_END_TIME.getMessage());
		}

		CreateScheduleRequest schedule = new CreateScheduleRequest(
			extracted.name(), extracted.startTime(), extracted.endTime(), extracted.description());

		createScheduleUseCase.execute(schedule, userId);

		return ChatBotResult.complete("일정을 등록했습니다. 필요한 일이 있으시면 언제든 불러주세요!");
	}
}
