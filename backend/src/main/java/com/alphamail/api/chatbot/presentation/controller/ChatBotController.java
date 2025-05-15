package com.alphamail.api.chatbot.presentation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.chatbot.application.service.RegistScheduleService;
import com.alphamail.api.chatbot.application.service.SearchDocumentService;
import com.alphamail.api.chatbot.domain.dto.DocumentTypes;
import com.alphamail.api.chatbot.infrastructure.prompt.ClassifyIntentPrompt;
import com.alphamail.api.chatbot.presentation.dto.ChatBotRequest;
import com.alphamail.api.chatbot.presentation.dto.ChatBotResponse;
import com.alphamail.api.erp.domain.service.CompanyReader;
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
	private final CompanyReader companyReader;

	@PostMapping("/message")
	public ResponseEntity<ChatBotResponse> handleMessage(@Auth Integer userId, @RequestBody ChatBotRequest request) {
		String message = request.message();

		String task = classifyIntentPrompt.determineTask(message);

		if (task == null) {
			return ResponseEntity.ok(new ChatBotResponse("죄송합니다, 방금 말씀하신 내용을 수행할 수 없습니다. "
				+ "다시 한 번 더 구체적으로 말씀해 주시겠어요? 어떤 일정이나 문서를 찾고 계신지 알려주시면 도와드릴게요!",
				List.of(),
				null
			));
		} else if (task.equals(DocumentTypes.TMP_SCHEDULE)) {
			return ResponseEntity.ok().build();
			// return ResponseEntity.ok(registScheduleService.execute(userId, message));
		} else if (task.equals(DocumentTypes.SCHEDULE)) {
			return ResponseEntity.ok(searchDocumentService.execute(task, userId, userId, message));
		} else {
			User user = userReader.findById(userId);
			Group group = groupReader.findById(user.getGroupId());
			return ResponseEntity.ok(searchDocumentService.execute(task, group.getCompany().getCompanyId(), userId, message));
		}
	}
}
