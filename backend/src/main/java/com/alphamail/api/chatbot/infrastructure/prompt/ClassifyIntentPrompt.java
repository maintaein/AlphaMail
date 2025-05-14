package com.alphamail.api.chatbot.infrastructure.prompt;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.infrastructure.adapter.ClaudeApiClient;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ClassifyIntentPrompt {

	private final ClaudeApiClient claudeApiClient;

	public boolean isScheduleRegistration(String message) {
		String prompt = """
			당신은 챗봇 입력을 분석하여 명령의 유형을 판별하는 도우미입니다.
			
			아래 메시지가 "일정 등록 요청"인지 "검색 요청"인지 판단하세요.
			- 일정 등록: 새로운 일정을 추가하는 요청입니다. (예: OO랑 미팅 잡아줘, 3시에 회의 일정 등록해줘 등)
			- 검색 요청: 기존 일정을 요약하거나 찾는 요청입니다. (예: 이번 주 일정 뭐 있었어?, 오늘 스케줄 알려줘 등)
			
			사용자 메시지: "%s"
			
			정답은 아래 중 하나로만 답하세요:
			1. 일정 등록
			2. 일정 검색
			""".formatted(message);

		String answer = claudeApiClient.askClaude(prompt).trim();

		return answer.startsWith("1");
	}
}
