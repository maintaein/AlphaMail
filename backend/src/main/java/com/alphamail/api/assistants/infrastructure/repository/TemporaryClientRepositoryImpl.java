package com.alphamail.api.assistants.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.alphamail.api.assistants.domain.entity.TemporaryClient;
import com.alphamail.api.assistants.domain.repository.TemporaryClientRepository;
import com.alphamail.api.assistants.infrastructure.entity.TemporaryClientEntity;
import com.alphamail.api.assistants.infrastructure.mapper.TemporaryClientEntityMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TemporaryClientRepositoryImpl implements TemporaryClientRepository {

	private final TemporaryClientJpaRepository temporaryClientJpaRepository;
	private final TemporaryClientEntityMapper temporaryClientEntityMapper;

	@Override
	public TemporaryClient save(TemporaryClient temporaryClient) {
		TemporaryClientEntity entity = temporaryClientEntityMapper.toEntity(temporaryClient);
		TemporaryClientEntity savedEntity = temporaryClientJpaRepository.save(entity);
		return temporaryClientEntityMapper.toDomain(savedEntity);
	}

	@Override
	public void deleteById(Integer temporaryClientId) {
		temporaryClientJpaRepository.deleteById(temporaryClientId);
	}

	@Override
	public Optional<TemporaryClient> findById(Integer temporaryClientId) {
		return temporaryClientJpaRepository.findById(temporaryClientId)
			.map(temporaryClientEntityMapper::toDomain);
	}
}
