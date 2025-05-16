package com.alphamail.api.chatbot.infrastructure.prompt;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SummarizePrompt {

	private final ClaudeApiClient claudeApiClient;

	public String generateAnswer(String documentType, String userQuery, String timezone,
		List<Map<String, String>> matchedSchedules) {
		String input = String.valueOf(matchedSchedules);
		String prompt = """
			다음은 %s 목록입니다. 사용자의 질문에 해당하는 항목만 골라서 전체 요약을 해주세요.
			또한, 어떤 항목이 요약에 사용됐는지도 함께 알려주세요.
			
			형식은 반드시 아래 JSON 구조를 따르세요:
			
			```
			{
			  "reply": "여기에 한 문단으로 작성한 요약이 들어갑니다...",
			  "ids": ["23", "25"]
			}
			```
			
			[요청]
			- 사용자 질문에서 원하는 조건(날짜, 종류, 장소, 참석자 등)에 해당하는 것만 선택
			- 주요 내용을 간결하게 요약
			- 사용자 질문과 관련 없는 내용은 포함하지 않기
			- 존댓말을 사용하고, 친절한 어투로 말할 것
			- 응답은 사용자에게 바로 전달할 수 있는 문장으로 작성
			- 사용자가 추가 질의를 할 수 있도록 유도하는 문장으로 끝맺기
			※ 중요: 모든 날짜 및 시간은 UTC 기준입니다. 아래에 명시된 사용자의 timezone(ex: +0900)을 고려하여, 사용자에게 보여질 시간으로 자동 변환해서 출력해주세요.
			
			[사용자 질문]
			%s
			
			[사용자 timezone]
			%s
			
			[%s 목록]
			%s
			""".formatted(documentType, userQuery, timezone, documentType, input);

		return claudeApiClient.askClaude(prompt);
	}
}
