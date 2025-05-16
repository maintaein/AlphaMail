package com.alphamail.api.assistants.domain.entity;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateCreateRequest;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmailTemplate {

	private Integer id;
	private Integer userId;
	private String title;
	private String context; // HTML 내용
	private List<EmailTemplateField> fields; // 필드 목록 추가
	private LocalDateTime createdAt; // 생성 시간 추가

	public static EmailTemplate createFromRequest(Integer userId, AIEmailTemplateCreateRequest request, String htmlContent) {
		List<EmailTemplateField> fields = request.fields().stream()
			.map(field -> EmailTemplateField.builder()
				.fieldName(field.fieldName())
				.fieldValue(field.fieldValue())
				.build())
			.collect(Collectors.toList());

		return EmailTemplate.builder()
			.userId(userId)
			.title(request.title())
			.context(htmlContent)
			.fields(fields)
			.createdAt(LocalDateTime.now())
			.build();
	}

	public AIEmailTemplateResponse toResponse() {
		// 필드명 기준으로 정렬
		List<AIEmailTemplateResponse.AIEmailTemplateFieldResponse> responseFields = this.fields.stream()
			.sorted(Comparator.comparing(EmailTemplateField::getFieldName))
			.map(field -> new AIEmailTemplateResponse.AIEmailTemplateFieldResponse(
				field.getFieldName(),
				field.getFieldValue()
			))
			.collect(Collectors.toList());

		return new AIEmailTemplateResponse(
			this.id,
			this.title,
			responseFields,
			this.context
		);
	}

	public void update(String title, List<EmailTemplateField> fields, String context) {
		this.title = title;
		this.fields = fields;
		this.context = context;
	}
}

