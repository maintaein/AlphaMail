package com.alphamail.api.chatbot.presentation.dto;

import java.util.List;

public record ChatBotResponse(
	String reply,
	List<Integer> ids,
	String type
) {
}
