package com.alphamail.api.chatbot.presentation.dto;

import java.util.List;

import com.alphamail.api.schedule.presentation.dto.CreateScheduleRequest;

public record ChatBotResponse(
	String reply,
	List<Integer> ids,
	String type,
	CreateScheduleRequest content
) {

	public static ChatBotResponse defaultResponse() {
		String reply = "죄송합니다, 방금 말씀하신 내용을 수행할 수 없습니다. "
			+ "다시 한 번 더 구체적으로 말씀해 주시겠어요? 어떤 일정이나 문서를 찾고 계신지 알려주시면 도와드릴게요!";
		return new ChatBotResponse(reply, List.of(), null, null);
	}
}
