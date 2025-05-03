package com.alphamail.api.email.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.infrastructure.entity.EmailAttachmentEntity;

@Component
public class EmailAttachmentMapper {

	public EmailAttachment toDomain(EmailAttachmentEntity entity) {
		if (entity == null) {
			return null;
		}

		return EmailAttachment.builder()
			.id(entity.getEmailAttachmentId())
			.name(entity.getName())
			.path(entity.getPath())
			.size(entity.getSize())
			.type(entity.getType())
			.build();
	}

	public EmailAttachmentEntity toEntity(EmailAttachment domain) {
		if (domain == null) {
			return null;
		}

		return new EmailAttachmentEntity(
			null,  // id 자동 생성
			null,  // user
			null,  // email
			domain.getName(),
			domain.getPath(),
			domain.getSize(),
			domain.getType()
		);
	}
}
