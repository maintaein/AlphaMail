package com.alphamail.api.chatbot.infrastructure.prompt;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.application.dto.ClaudeClassification;
import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;
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

	public ClaudeClassification determineTask(String message) {
		String prompt = """
			당신은 챗봇 입력을 분석하여 명령의 유형을 판별하는 도우미입니다.
			
			아래 사용자 메시지를 보고 다음을 판단하세요:
			1. 명령의 유형 (1. 일정 등록 / 2. 일정 검색 / 3. 발주서 검색 / 4. 견적서 검색 / 5. 무관)
			- 일정 등록: 새로운 일정을 추가하는 요청입니다. (예: OO랑 미팅 잡아줘, 3시에 회의 일정 등록해줘 등)
			- 검색 요청: 기존 일정, 발주서, 견적서를 요약하거나 찾는 요청입니다. (예: 이번 주 일정 뭐 있었어?, 오늘 스케줄 알려줘 등)
			2. 메시지 내에 날짜 표현이 있다면 다음 형식으로 사용자 메시지를 바꾸어 출력해주세요.
			- 아래 제시된 기준 날짜 정보를 활용해서 계산하세요.
			- 날짜 형식: "YYYY년 MM월 DD일 HH시 mm분" (예: 2025년 05월 15일 14시 30분)
			- 사용자 메시지에 시간이 없다면 시간 정보는 제외하세요.
			- 예시 : "오늘 일정은 뭐가 있어?" -> "2025년 05월 16일 일정은 뭐가 있어?"
			
			사용자 메시지: "%s"
			기준 날짜: %s
			
			정답은 반드시 아래 응답 예시를 따라 답하세요:
			- 응답 형식 예시 (JSON):
			{
			  "type": "3. 발주서 검색"
			  "message": "2025년 05월 16일 14시 30분에 등록된 발주서 보여줘"
			""".formatted(message, LocalDateTime.now());

		String claudeResponse = claudeApiClient.askClaude(prompt);
		try {
			return objectMapper.readValue(claudeResponse, ClaudeClassification.class);
		} catch (JsonProcessingException e) {
			return null;
		}
	}
}
