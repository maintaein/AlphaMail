package com.alphamail.api.assistants.infrastructure.repository.emailtemplate;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;
import com.alphamail.api.assistants.domain.repository.EmailTemplateRepository;
import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateEntity;
import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateFieldEntity;
import com.alphamail.api.assistants.infrastructure.mapper.EmailTemplateMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailTemplateRepositoryImpl implements EmailTemplateRepository {

	private final EmailTemplateJpaRepository emailTemplateJpaRepository;
	private final EmailTemplateMapper emailTemplateMapper;

	@Override
	public EmailTemplate save(EmailTemplate emailTemplate) {
		// 도메인 -> 엔티티 변환
		EmailTemplateEntity entity = emailTemplateMapper.toEntity(emailTemplate);

		if (entity.getFields() != null) {
			for (EmailTemplateFieldEntity field : entity.getFields()) {
				field.setTemplate(entity);
			}
		}

		// 저장
		EmailTemplateEntity savedEntity = emailTemplateJpaRepository.save(entity);

		// 엔티티 -> 도메인 변환
		return emailTemplateMapper.toDomain(savedEntity);

	}

	@Override
	public List<EmailTemplate> findByUserId(Integer userId) {
		List<EmailTemplateEntity> entities = emailTemplateJpaRepository.findByUser_UserId(userId);
		// 엔티티 리스트 -> 도메인 리스트 변환
		return entities.stream()
			.map(emailTemplateMapper::toDomain)
			.toList();
	}

	@Override
	public EmailTemplate findById(Integer id) {
		return emailTemplateJpaRepository.findById(id)
			.map(emailTemplateMapper::toDomain)
			.orElse(null);
	}

	@Override
	public void deleteById(Integer id) {
		emailTemplateJpaRepository.deleteById(id);
	}
}