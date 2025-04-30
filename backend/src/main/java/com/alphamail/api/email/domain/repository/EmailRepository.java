package com.alphamail.api.email.domain.repository;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.entity.EmailStatus;

public interface EmailRepository {
	Email save(Email email);

	Email updateStatus(Integer emailId, EmailStatus status);
}
