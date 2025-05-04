package com.alphamail.api.email.domain.repository;

import java.util.List;

import com.alphamail.api.email.domain.entity.EmailAttachment;

public interface EmailAttachmentRepository {

	Integer getTotalSizeByEmailId(Integer emailId);

	List<EmailAttachment> findAllByEmailId(Integer emailId);
}
