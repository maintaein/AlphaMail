package com.alphamail.api.email.domain.repository;


public interface EmailAttachmentRepository {

	Integer getTotalSizeByEmailId(Integer emailId);
}
