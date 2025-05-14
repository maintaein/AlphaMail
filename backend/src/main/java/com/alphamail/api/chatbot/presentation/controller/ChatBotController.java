package com.alphamail.api.chatbot.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.chatbot.application.dto.ChatBotResult;
import com.alphamail.api.chatbot.application.service.RegistScheduleService;
import com.alphamail.api.chatbot.application.service.SearchScheduleService;
import com.alphamail.api.chatbot.infrastructure.prompt.ClassifyIntentPrompt;
import com.alphamail.api.chatbot.presentation.dto.ChatBotRequest;
import com.alphamail.api.chatbot.presentation.dto.ChatBotResponse;
import com.alphamail.common.annotation.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatbot")
public class ChatBotController {

	private final ClassifyIntentPrompt classifyIntentPrompt;
	private final RegistScheduleService registScheduleService;
	private final SearchScheduleService searchScheduleService;

	@PostMapping("/message")
	public ResponseEntity<ChatBotResponse> handleMessage(@RequestBody ChatBotRequest request) {
		String message = request.message();

		ChatBotResult result;
		if (classifyIntentPrompt.isScheduleRegistration(message)) {
			result = registScheduleService.execute(request);
			return ResponseEntity.ok(ChatBotResponse.from(result));
		} else {
			result = searchScheduleService.searchWithSummary(request);
			return ResponseEntity.ok(ChatBotResponse.from(result));
		}
	}
}
