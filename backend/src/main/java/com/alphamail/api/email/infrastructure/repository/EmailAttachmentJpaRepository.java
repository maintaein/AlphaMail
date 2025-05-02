package com.alphamail.api.email.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.alphamail.api.email.infrastructure.entity.EmailAttachmentEntity;

public interface EmailAttachmentJpaRepository extends JpaRepository<EmailAttachmentEntity, Integer> {

	@Query("SELECT SUM(e.size) FROM EmailAttachmentEntity e WHERE e.email.emailId = :emailId")
	Integer sumSizeByEmailId(Integer emailId);
}
