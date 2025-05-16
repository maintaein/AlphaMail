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
			String userPrompt = buildUserPrompt(title,
				fields != null ? fields : Collections.emptyList(),
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
			1. 전체 HTML은 <html><head>...</head><body>...</body></html>로 감쌉니다.
			2. <style> 태그를 사용하여 기본 스타일을 지정해주세요. 예: p{margin-top:0px; margin-bottom:0px;}
			3. 폰트는 Gulim 또는 굴림으로 지정합니다. (예: font-family:Gulim,굴림,sans-serif)
			4. 제목은 <span style="font-size: 24px; font-weight: bold;">형식으로 표시해주세요.
			5. 본문은 <p style="font-size:10pt; font-family:sans-serif;"> 형식으로 감싸주세요.
			6. 이메일 답장 체인을 표현할 때는 <p> 안에 From, To, Sent, Subject를 포함한 구문을 <br>로 구분해서 작성해주세요.
			7. 본문 주요 내용은 <h1>, <div>, <p> 등을 조합하여 시각적으로 명확하게 작성해주세요.
			8. 끝에 자동 수신 확인 이미지는 삽입하지 않아도 됩니다.
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