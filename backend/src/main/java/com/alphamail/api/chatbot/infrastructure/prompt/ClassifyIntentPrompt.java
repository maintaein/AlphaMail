package com.alphamail.api.chatbot.infrastructure.prompt;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.application.dto.ClaudeClassification;
import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;
import com.alphamail.common.util.TimezoneHelper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ClassifyIntentPrompt {

	private final ClaudeApiClient claudeApiClient;
	private final ObjectMapper objectMapper;

	public ClaudeClassification determineTask(String message, String timezone, LocalDateTime userTime) {
		String prompt = """
			당신은 챗봇 입력을 분석하여 명령의 유형을 판별하는 도우미입니다.
			
			아래 사용자 메시지를 보고 다음을 판단하세요:
			1. 명령의 유형 (1. 일정 등록 / 2. 일정 검색 / 3. 발주서 검색 / 4. 견적서 검색 / 5. 무관)
			- 일정 등록: 새로운 일정을 추가하는 요청입니다. (예: OO랑 미팅 잡아줘, 3시에 회의 일정 등록해줘 등)
			- 검색 요청: 기존 일정, 발주서, 견적서를 요약하거나 찾는 요청입니다. (예: 이번 주 일정 뭐 있었어?, 오늘 스케줄 알려줘 등)
			
			2. 메시지 내에 날짜나 시간이 포함되어 있다면, **UTC 기준으로 변환된 날짜 문자열**로 사용자 메시지를 변환해서 출력해주세요.
			- 사용자의 시간대는 UTC%s입니다.
			- 날짜 포맷은 반드시 `"yyyy년 MM월 dd일 HH시 mm분"` 형식을 따라야 하며, 시간 정보가 없으면 `"yyyy년 MM월 dd일"`까지만 출력하세요.
			- 날짜를 UTC 기준으로 계산할 때는 아래의 기준 날짜를 참고하세요.
			- 예: 기준 날짜가 `2025-05-19T09:00:00`이고 사용자 메시지가 "오늘 3시에 회의 있어?"일 경우:
			   → 사용자 기준: `2025년 05월 19일 15시 00분`
			   → UTC 기준 변환: `2025년 05월 19일 06시 00분`
			   → 변환된 message는: `"2025년 05월 19일 06시 00분에 회의 있어?"`
			
			[사용자 메시지]
			"%s"
			
			[기준 날짜 (사용자 기준)]
			%s
			
			[사용자 시간대]
			UTC%s
			
			응답은 반드시 아래 형식을 따라주세요:
			
			응답 예시 (JSON 형식):
			{
			  "type": "3. 발주서 검색"
			  "message": "2025년 05월 16일 05시 30분에 등록된 발주서 보여줘"
			}
			""".formatted(timezone, message, userTime, timezone);

		String claudeResponse = claudeApiClient.askClaude(prompt);
		try {
			return objectMapper.readValue(claudeResponse, ClaudeClassification.class);
		} catch (JsonProcessingException e) {
			return null;
		}
	}
}
