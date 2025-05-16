package com.alphamail.api.assistants.domain.entity;

import java.util.ArrayList;
import java.util.List;

import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateCreateRequest;
import com.alphamail.api.assistants.presentation.dto.emailtemplate.AIEmailTemplateUpdateRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmailTemplateField {
	private Integer id;
	private Integer templateId; // 템플릿 ID 참조
	private String fieldName;
	private String fieldValue;
	private Integer displayOrder; // 표시 순서 추가

	public static List<EmailTemplateField> fromCreateRequests(
		List<AIEmailTemplateCreateRequest.TemplateField> requests) {
		if (requests == null || requests.isEmpty())
			return List.of();

		List<EmailTemplateField> result = new ArrayList<>();
		for (int i = 0; i < requests.size(); i++) {
			var req = requests.get(i);
			result.add(EmailTemplateField.builder()
				.fieldName(req.fieldName())
				.fieldValue(req.fieldValue())
				.displayOrder(i)
				.build());
		}
		return result;
	}

	public static List<EmailTemplateField> fromUpdateRequests(
		List<AIEmailTemplateUpdateRequest.AIEmailTemplateFieldRequest> requests) {
		if (requests == null || requests.isEmpty())
			return List.of();

		List<EmailTemplateField> result = new ArrayList<>();
		for (int i = 0; i < requests.size(); i++) {
			var req = requests.get(i);
			result.add(EmailTemplateField.builder()
				.fieldName(req.fieldName())
				.fieldValue(req.fieldValue())
				.displayOrder(i)
				.build());
		}
		return result;
	}
}
