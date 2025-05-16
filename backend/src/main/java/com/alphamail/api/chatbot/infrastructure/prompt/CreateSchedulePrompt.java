package com.alphamail.api.chatbot.infrastructure.prompt;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.application.dto.ClaudeCreateSchedule;
import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CreateSchedulePrompt {

	private final ClaudeApiClient claudeApiClient;
	private final ObjectMapper objectMapper;

	public ClaudeCreateSchedule makeScheduleToJson(String message) {
		String prompt = """
					당신은 사용자의 자연어 입력에서 일정 정보를 추출하고, 사용자에게 친절한 답변을 제공하는 일정 비서입니다.
			
			  		아래 사용자의 입력을 분석해 다음 JSON 형식으로 응답해 주세요:
					```
					{
			  			"reply": "사용자에게 보여줄 친절한 메시지",
			  			"content": {
			  				"name": "...",
			  				"description": "...",
			  				"startTime": "YYYY-MM-DDTHH:MM:SS",
			  				"endTime": "YYYY-MM-DDTHH:MM:SS"
			  			}
			  		}
					```
					요구사항:
					1. `reply`는 사용자에게 직접 보여줄 응답 문장입니다. 존댓말을 사용하고, 친절하게 작성해주세요.
					   ex) "내일 오후 3시에 회의를 등록하겠습니다. 일정이 맞는지 확인해주세요!"
			  		2. `content`는 일정 정보를 담는 JSON 객체이며, 추출할 수 있는 값만 포함해주세요.
			  		   - name: 일정 제목
			  		   - description: 일정 설명
			  		   - startTime / endTime: 날짜가 명시되어 있지 않다면, 기준 날짜를 기준으로 계산해주세요.
			  		3. 예:
			  		   - 기준 날짜가 '2025-05-24T09:00:00'이고 입력이 '내일 3시에 회의 잡아줘'이면, startTime은 2025-05-25T15:00:00으로 설정합니다.
			  		4. 특정 값(name, startTime 등)을 추출할 수 없으면 `content`에서 생략해도 됩니다.
			
					[입력]
			  		%s
			
			  		[기준 날짜]
			  		%s
			""".formatted(message, LocalDateTime.now());
		String claudResponse = claudeApiClient.askClaude(prompt);

		try {
			return objectMapper.readValue(claudResponse, ClaudeCreateSchedule.class);
		} catch (JsonProcessingException e) {
			return null;
		}
	}
}
