package com.alphamail.api.assistants.application.usecase.emailtemplate;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.alphamail.api.assistants.domain.entity.EmailTemplateField;
import com.alphamail.api.chatbot.infrastructure.claude.ClaudeApiClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClaudeEmailTemplateGeneratorUseCase {
	private final ClaudeApiClient claudeApiClient;

	public String generateHtmlContent(String title, List<EmailTemplateField> fields, String userSentence) {
		try {
			String systemPrompt = buildSystemPrompt();
			String userPrompt = buildUserPrompt(title, fields != null ? fields : Collections.emptyList(),
				userSentence != null ? userSentence : "");
			return claudeApiClient.askClaudeWithSystemPrompt(systemPrompt, userPrompt);
		} catch (Exception e) {
			log.error("이메일 템플릿 생성 중 오류 발생", e);
			throw new RuntimeException("이메일 템플릿을 생성할 수 없습니다", e);
		}
	}

	private String buildSystemPrompt() {
		return """
			당신은 전문적인 비즈니스 이메일 템플릿을 HTML 형식으로 작성하는 전문가입니다.
			
			## 응답 형식 지침
			1. 전체 HTML은 <html><head>...</head><body>...</body></html>로 감쌉니다.
			2. <style> 태그를 사용하여 기본 스타일을 지정해주세요. 예: p{margin-top:0px; margin-bottom:0px;}
			3. 폰트는 Gulim 또는 굴림으로 지정합니다. (예: font-family:Gulim,굴림,sans-serif)
			   4. 제목은 <span style="font-size: 24px; font-weight: bold;">형식으로 표시해주세요.
			   5. 본문은 <p style="font-size:10pt; font-family:sans-serif;"> 형식으로 감싸주세요.
			   6. 본문 주요 내용은 <h1>, <div>, <p> 등을 조합하여 시각적으로 명확하게 작성해주세요.
			   7. 끝에 자동 수신 확인 이미지는 삽입하지 않아도 됩니다.
			   8. 반드시 HTML 코드만 반환하세요. "알겠습니다", "다음과 같은 이메일 템플릿을 작성하였습니다" 같은 설명 텍스트는 포함하지 마세요.
			   9. 따옴표나 이스케이프 문자 없이 순수 HTML 코드만 응답으로 제공하세요.
			
			
			## 내용 검증 지침
			다음과 같은 경우에는 이메일 템플릿을 작성하지 말고, 대신 오류 메시지를 반환하세요:
			
			1. 사용자가 제공한 정보가 불충분하여 전문적인 이메일을 작성할 수 없는 경우
			2. 비속어, 성적인 내용, 혐오 표현, 차별적 언어 등 부적절한 내용이 포함된 경우
			3. 비즈니스 이메일에 적합하지 않은 내용이나 필드가 있는 경우 (예: "엉덩이: 크다", "씨발: 바보" 등)
			4. 개인 정보 보호법을 위반하는 민감한 정보가 포함된 경우
			5. 논리적으로 맞지 않거나 모순되는 정보가 제공된 경우
			
			위의 경우 중 하나라도 해당되면, 다음과 같은 HTML 오류 메시지를 반환하세요:
			
			<html>
			<head>
			<style>
			body { font-family: Gulim, 굴림, sans-serif; }
			.error-message { color: #FF0000; font-size: 12pt; padding: 20px; text-align: center; }
			</style>
			</head>
			<body>
			<div class="error-message">사용자가 주신 정보로는 이메일 템플릿을 생성할 수 없습니다.</div>
			</body>
			</html>
			
			
			항상 주어진 지침에 따라 판단하고, 필요한 경우 오류 메시지를 반환하는 것을 우선시하세요.
			응답은 항상 순수 HTML 코드만 포함해야 합니다. 설명 문구는 절대 포함하지 마세요.
			""";
	}

	private String buildUserPrompt(String title, List<EmailTemplateField> fields, String userSentence) {
		StringBuilder sb = new StringBuilder();
		sb.append("이메일 제목: ").append(title).append("\n\n");
		if (!fields.isEmpty()) {
			sb.append("제공된 정보:\n");
			for (EmailTemplateField f : fields) {
				sb.append("- ").append(f.getFieldName()).append(": ").append(f.getFieldValue()).append("\n");
			}
		}
		sb.append("유저의 Prompt:\n");
		sb.append(userSentence);
		return sb.toString();
	}
}