package com.alphamail.api.chatbot.presentation.dto;

public record ChatBotRequest(
	String message,
	String timezone
) {
}
