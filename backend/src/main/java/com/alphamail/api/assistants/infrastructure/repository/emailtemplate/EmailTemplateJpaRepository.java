package com.alphamail.api.assistants.infrastructure.repository.emailtemplate;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alphamail.api.assistants.infrastructure.entity.EmailTemplateEntity;

public interface EmailTemplateJpaRepository extends JpaRepository<EmailTemplateEntity, Integer> {

	// 사용자 ID로 템플릿 목록 조회
	List<EmailTemplateEntity> findByUser_UserId(Integer userId);
}