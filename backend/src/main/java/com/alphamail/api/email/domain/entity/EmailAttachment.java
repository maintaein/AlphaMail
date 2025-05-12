package com.alphamail.api.email.domain.entity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.alphamail.api.email.presentation.dto.AttachmentRequest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class EmailAttachment {
	private Integer id;
	private Integer emailId;
	private String name;
	private String S3Key;
	private Long size;
	private String type;

	/**
	 * ReceiveEmailRequest의 AttachmentRequest 리스트로부터 EmailAttachment 리스트를 생성합니다.
	 *
	 * @param attachmentRequests 첨부파일 요청 리스트
	 * @param emailId 이메일 ID
	 * @return EmailAttachment 객체 리스트
	 */
	public static List<EmailAttachment> createAttachments(List<AttachmentRequest> attachmentRequests, Integer emailId) {
		if (attachmentRequests == null || attachmentRequests.isEmpty()) {
			return Collections.emptyList();
		}

		return attachmentRequests.stream()
			.map(request -> EmailAttachment.builder()
				.id(null)
				.emailId(emailId)
				.name(request.filename())
				.S3Key(request.s3Key())
				.size(request.size())
				.type(request.contentType())
				.build())
			.collect(Collectors.toList());

	}



}
