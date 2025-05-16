package com.alphamail.api.assistants.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.assistants.domain.repository.EmailTemplateRepository;
import com.alphamail.api.assistants.infrastructure.mapper.EmailTemplateMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailTemplateRepositoryImpl implements EmailTemplateRepository {

	private final EmailTemplateJpaRepository emailTemplateJpaRepository;
	private final EmailTemplateMapper emailTemplateMapper;

}
