package com.alphamail.api.organization.infrastructure.repository;

import org.springframework.stereotype.Repository;

import com.alphamail.api.organization.domain.entity.Client;
import com.alphamail.api.organization.domain.repository.ClientRepository;
import com.alphamail.api.organization.infrastructure.mapping.ClientMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ClientRepositoryImpl implements ClientRepository {

	private final ClientJpaRepository clientJpaRepository;
	private final ClientMapper clientMapper;

	@Override
	public Client findById(Integer id) {
		return clientJpaRepository.findById(id)
			.map(clientMapper::toDomain)
			.orElse(null); // or throw exception if required
	}
}
