package com.alphamail.api.chatbot.infrastructure.prompt;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.application.dto.ClaudeCreateSchedule;
import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;
import com.alphamail.common.util.TimezoneHelper;
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

	public ClaudeCreateSchedule makeScheduleToJson(String message, String timezone, LocalDateTime userTime) {
		String prompt = """
			당신은 사용자의 자연어 입력에서 일정 정보를 추출하고, 사용자에게 친절한 답변을 제공하는 일정 비서입니다.
			
					다음 규칙에 따라 응답해 주세요:
			
					1. 전체 응답은 아래 JSON 형식을 따릅니다:
					```
					{
				  		"reply": "사용자에게 보여줄 친절한 메시지 (사용자 시간대 기준)",
				  		"content": {
				  			"name": "...",
				  			"description": "...",
				  			"startTime": "UTC 기준 ISO-8601 형식 (예: 2025-05-25T06:00:00)",
				  			"endTime": "UTC 기준 ISO-8601 형식"
				  		}
				  	}
					```
			
					2. 규칙:
					- `reply`: 사용자 타임존 (UTC%s) 기준으로 작성. 존댓말을 사용하고 친절하게 말해 주세요. 마크다운 형태로 보기 좋게 작성해주세요.
					  예: "내일 오후 3시에 회의를 등록하겠습니다. 일정이 맞는지 확인해주세요!"
					- `content.startTime`, `endTime`: **UTC 기준으로 계산**된 시간을 ISO-8601 형식으로 반환하세요.
					- 사용자가 명시하지 않은 값은 생략 가능합니다.
			
					3. 시간 추론:
					- 기준 날짜는 `기준 날짜 (사용자 시간대 기준)`입니다.
					- 예: 기준 날짜가 '2025-05-24T09:00:00'이고 사용자 타임존이 UTC+0900이며, 입력이 '내일 3시에 회의 잡아줘'이면,
					  → 사용자 기준 `2025-05-25T15:00:00` → 이를 UTC로 변환해 `2025-05-25T06:00:00`로 `content.startTime`에 넣으세요.
			
					[입력 메시지]
					%s
			
					[입력 날짜 (사용자 시간대 기준)]
					%s
			""".formatted(
			timezone,
			message,
			userTime
		);
		String claudResponse = claudeApiClient.askClaude(prompt);

		try {
			return objectMapper.readValue(claudResponse, ClaudeCreateSchedule.class);
		} catch (JsonProcessingException e) {
			return null;
		}
	}
}
