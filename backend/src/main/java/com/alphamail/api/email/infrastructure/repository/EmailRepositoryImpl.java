package com.alphamail.api.email.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;
import com.alphamail.api.email.domain.repository.EmailRepository;
import com.alphamail.api.email.infrastructure.entity.EmailEntity;
import com.alphamail.api.email.infrastructure.mapper.EmailMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailRepositoryImpl implements EmailRepository {
	private final EmailJpaRepository emailJpaRepository;
	private final EmailMapper emailMapper;

	@Override
	public Email save(Email email) {
		EmailEntity entity = emailMapper.toEntity(email);
		EmailEntity savedEntity = emailJpaRepository.save(entity);

		return emailMapper.toDomain(savedEntity);
	}

	@Override
	public Email updateStatus(Integer emailId, EmailStatus status) {
		EmailEntity entity = emailJpaRepository.findById(emailId).orElse(null);

		entity.updateStatus(status);


		return emailMapper.toDomain(emailJpaRepository.save(entity));

	}
}
