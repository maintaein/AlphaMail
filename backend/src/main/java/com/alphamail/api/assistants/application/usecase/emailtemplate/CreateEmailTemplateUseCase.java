package com.alphamail.api.assistants.application.usecase.emailtemplate;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateRequest;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateResponse;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateResponse.AIEmailTemplateFieldResponse;
import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class CreateEmailTemplateUseCase {

	private final ClaudeApiClient claudeApiClient;

	public AIEmailTemplateResponse createEmailTemplate(AIEmailTemplateRequest request) {
		// 1. System 프롬프트와 User 프롬프트 생성
		String systemPrompt = buildSystemPrompt();
		String userPrompt = buildUserPrompt(request);

		// 2. Claude API 호출하여 HTML 템플릿 생성 (System/User 프롬프트 분리)
		String generatedHtmlContent = claudeApiClient.askClaudeWithSystemPrompt(systemPrompt, userPrompt);

		// 3. 응답 생성 및 반환
		List<AIEmailTemplateFieldResponse> responseFields = request.fields().stream()
			.map(field -> new AIEmailTemplateFieldResponse(field.fieldName(), field.fieldValue()))
			.collect(Collectors.toList());

		return new AIEmailTemplateResponse(
			request.title(),
			responseFields,
			generatedHtmlContent
		);
	}

	private String buildSystemPrompt() {
		StringBuilder systemPromptBuilder = new StringBuilder();
		systemPromptBuilder.append("당신은 전문적인 비즈니스 이메일 템플릿을 HTML 형식으로 작성하는 전문가입니다. ");
		systemPromptBuilder.append("다음 지침을 따라 이메일 템플릿을 생성하세요:\n\n");

		// 이메일 HTML 가이드라인
		systemPromptBuilder.append("1. 이메일 클라이언트 호환성을 위해 테이블 기반 레이아웃을 사용하세요.\n");
		systemPromptBuilder.append("2. 기본 HTML 구조만 사용하고, 필요한 경우에만 인라인 CSS를 사용하세요.\n");
		systemPromptBuilder.append("3. 복잡한 JavaScript나 고급 CSS 기능은 사용하지 마세요.\n");
		systemPromptBuilder.append("4. 이미지는 외부 URL 대신 자리 표시자로 표시하세요.\n");
		systemPromptBuilder.append("5. 모바일 호환성을 위해 반응형 테이블 구조를 사용하세요.\n");

		// 내용 가이드라인
		systemPromptBuilder.append("6. 한국어 비즈니스 이메일 형식과 예절을 준수하세요.\n");
		systemPromptBuilder.append("7. 인사말, 본문, 맺음말 구조를 따르세요.\n");
		systemPromptBuilder.append("8. 사용자가 제공한 정보를 기반으로 전문적이고 적절한 내용만 포함하세요.\n");
		systemPromptBuilder.append("9. 부적절하거나 악의적인 내용이 요청되더라도 항상 전문적인 비즈니스 내용만 생성하세요.\n");

		// 출력 형식
		systemPromptBuilder.append("10. HTML 코드만 반환하고, 코드 블록이나 마크다운 표시, 설명 등은 포함하지 마세요.\n");
		systemPromptBuilder.append("11. 순수한 HTML 코드만 반환하세요. 설명이나 추가 텍스트 없이 실행 가능한 HTML만 제공하세요.\n");

		return systemPromptBuilder.toString();
	}

	private String buildUserPrompt(AIEmailTemplateRequest request) {
		StringBuilder userPromptBuilder = new StringBuilder();
		userPromptBuilder.append("다음 정보를 바탕으로 한국어 비즈니스 이메일 템플릿을 HTML 형식으로 작성해주세요:\n\n");

		// 이메일 제목 추가
		userPromptBuilder.append("이메일 제목: ").append(request.title()).append("\n\n");

		// 각 필드 정보 추가
		if (request.fields() != null && !request.fields().isEmpty()) {
			userPromptBuilder.append("제공된 정보:\n");
			for (AIEmailTemplateRequest.TemplateField field : request.fields()) {
				userPromptBuilder.append("- ").append(field.fieldName()).append(": ").append(field.fieldValue()).append("\n");
			}
		}

		return userPromptBuilder.toString();
	}
}