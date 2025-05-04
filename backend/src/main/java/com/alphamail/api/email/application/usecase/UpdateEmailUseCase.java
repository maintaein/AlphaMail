package com.alphamail.api.email.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;
import com.alphamail.api.email.domain.repository.EmailRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UpdateEmailUseCase {
	private EmailRepository emailRepository;

	public Email execute(Integer emailId, EmailStatus status) {
		return emailRepository.updateStatus(emailId, status);

	}
}
