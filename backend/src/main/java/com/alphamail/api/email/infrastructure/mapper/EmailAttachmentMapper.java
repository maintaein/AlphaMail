package com.alphamail.api.email.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.infrastructure.entity.EmailAttachmentEntity;
import com.alphamail.api.email.infrastructure.entity.EmailEntity;
import jakarta.persistence.EntityManager;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailAttachmentMapper {
	private final EntityManager entityManager;

	public EmailAttachment toDomain(EmailAttachmentEntity entity) {
		if (entity == null) {
			return null;
		}

		return EmailAttachment.builder()
			.id(entity.getEmailAttachmentId())
			.name(entity.getName())
			.S3Key(entity.getS3Key())
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
			entityManager.getReference(EmailEntity.class, domain.getEmailId()),  // email
			domain.getName(),
			domain.getS3Key(),
			domain.getSize(),
			domain.getType()
		);
	}
}
