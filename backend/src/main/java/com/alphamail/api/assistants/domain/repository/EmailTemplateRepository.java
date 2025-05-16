package com.alphamail.api.assistants.domain.repository;

import java.util.List;

import com.alphamail.api.assistants.domain.entity.EmailTemplate;

public interface EmailTemplateRepository {

	EmailTemplate save(EmailTemplate emailTemplate);

	List<EmailTemplate> findByUserId(Integer userId);

	EmailTemplate findById(Integer id);

	void deleteById(Integer id);
}