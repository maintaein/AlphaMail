package com.alphamail.api.email.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.email.domain.repository.EmailAttachmentRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailAttachmentRepositoryImpl implements EmailAttachmentRepository {

	private final EmailAttachmentJpaRepository emailAttachmentJpaRepository;

	@Override
	public Integer getTotalSizeByEmailId(Integer emailId) {
		Integer totalSize = emailAttachmentJpaRepository.sumSizeByEmailId(emailId);
		return totalSize != null ? totalSize : 0;
	}
}
