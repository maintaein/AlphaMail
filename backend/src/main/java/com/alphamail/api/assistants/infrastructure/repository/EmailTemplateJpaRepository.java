package com.alphamail.api.assistants.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateEntity;

public interface EmailTemplateJpaRepository extends JpaRepository<EmailTemplateEntity, Integer> {
}
