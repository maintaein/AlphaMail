package com.alphamail.api.assistants.domain.repository;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;

public interface TemporaryClientRepository {

	TemporaryClient save(TemporaryClient temporaryClient);
}
