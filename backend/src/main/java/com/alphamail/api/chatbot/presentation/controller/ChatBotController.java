package com.alphamail.api.chatbot.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.chatbot.application.dto.ClaudeClassification;
import com.alphamail.api.chatbot.application.service.SearchDocumentService;
import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.chatbot.infrastructure.prompt.ClassifyIntentPrompt;
import com.alphamail.api.chatbot.presentation.dto.ChatBotRequest;
import com.alphamail.api.chatbot.presentation.dto.ChatBotResponse;
import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.erp.domain.service.UserReader;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;
import com.alphamail.common.annotation.Auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatbot")
public class ChatBotController {

	private final ClassifyIntentPrompt classifyIntentPrompt;
	private final SearchDocumentService searchDocumentService;
	private final UserReader userReader;
	private final GroupReader groupReader;

	@PostMapping("/message")
	public ResponseEntity<ChatBotResponse> handleMessage(@Auth Integer userId, @RequestBody ChatBotRequest request) {
		String message = request.message();
		String timezone = request.timezone();

		ClaudeClassification task = classifyIntentPrompt.determineTask(message);
		log.info("🚨claude가 변환한 사용자 메시지: {}", task.message());

		if (task.type().startsWith("1")) {
			return ResponseEntity.ok().build();
			// return ResponseEntity.ok(registScheduleService.execute(userId, message));
		} else if (task.type().startsWith("2")) {
			return ResponseEntity.ok(
				searchDocumentService.execute(DocumentTypes.SCHEDULE, userId, userId, task.message(), timezone));
		} else if (task.type().startsWith("3")) {
			User user = userReader.findById(userId);
			Group group = groupReader.findById(user.getGroupId());
			return ResponseEntity.ok(
				searchDocumentService.execute(DocumentTypes.PURCHASE_ORDER, group.getCompany().getCompanyId(), userId,
					task.message(), timezone));
		} else if (task.type().startsWith("4")) {
			User user = userReader.findById(userId);
			Group group = groupReader.findById(user.getGroupId());
			return ResponseEntity.ok(
				searchDocumentService.execute(DocumentTypes.QUOTE, group.getCompany().getCompanyId(), userId,
					task.message(), timezone));
		} else {
			return ResponseEntity.ok(ChatBotResponse.defaultResponse());
		}
	}
}
