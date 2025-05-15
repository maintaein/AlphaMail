package com.alphamail.api.chatbot.application.dto;

import java.util.List;

public record ClaudeReply(
	String reply,
	List<String> ids
) {
}
