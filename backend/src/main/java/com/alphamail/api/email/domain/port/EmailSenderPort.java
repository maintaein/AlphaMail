package com.alphamail.api.email.domain.port;

import com.alphamail.api.email.domain.entity.Email;

public interface EmailSenderPort {
	void send(Email email);
}
