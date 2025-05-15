package com.alphamail.api.assistants.domain.repository;

import java.util.Optional;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;

public interface TemporaryClientRepository {

	TemporaryClient save(TemporaryClient temporaryClient);

	void deleteById(Integer temporaryClientId);

	Optional<TemporaryClient> findById(Integer temporaryClientId);

}
