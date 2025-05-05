package com.alphamail.api.email.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.domain.repository.EmailAttachmentRepository;
import com.alphamail.api.email.infrastructure.mapper.EmailAttachmentMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailAttachmentRepositoryImpl implements EmailAttachmentRepository {

	private final EmailAttachmentJpaRepository emailAttachmentJpaRepository;
	private final EmailAttachmentMapper emailAttachmentMapper;

	@Override
	public Integer getTotalSizeByEmailId(Integer emailId) {
		Integer totalSize = emailAttachmentJpaRepository.sumSizeByEmailId(emailId);
		return totalSize != null ? totalSize : 0;
	}

	@Override
	public List<EmailAttachment> findAllByEmailId(Integer emailId) {
		return emailAttachmentJpaRepository.findAllByEmail_EmailId(emailId)
			.stream()
			.map(emailAttachmentMapper::toDomain)
			.collect(Collectors.toList());

	}

	@Override
	public Optional<EmailAttachment> findById(Integer attachmentId) {
		return emailAttachmentJpaRepository.findById(attachmentId).map(emailAttachmentMapper::toDomain);
	}

}
