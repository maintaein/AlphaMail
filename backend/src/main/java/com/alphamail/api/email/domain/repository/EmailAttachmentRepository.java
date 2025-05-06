package com.alphamail.api.email.domain.repository;

import java.util.List;
import java.util.Optional;

import com.alphamail.api.email.domain.entity.EmailAttachment;
import com.alphamail.api.email.presentation.dto.SendEmailRequest;

public interface EmailAttachmentRepository {

	Integer getTotalSizeByEmailId(Integer emailId);

	List<EmailAttachment> findAllByEmailId(Integer emailId);

	Optional<EmailAttachment> findById(Integer attachmentId);

	Void saveAll(List<EmailAttachment> emailAttachmentList);
}
