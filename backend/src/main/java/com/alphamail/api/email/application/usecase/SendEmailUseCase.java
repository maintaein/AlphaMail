package com.alphamail.api.email.application.usecase;

import org.springframework.stereotype.Service;

import com.alphamail.api.email.domain.entity.Email;
import com.alphamail.api.email.domain.port.EmailSenderPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SendEmailUseCase {
	private final EmailSenderPort emailSenderPort;

	public void execute(Email email) {
		emailSenderPort.send(email);
	}
}
