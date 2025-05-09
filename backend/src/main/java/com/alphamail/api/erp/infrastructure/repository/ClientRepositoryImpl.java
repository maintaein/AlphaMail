package com.alphamail.api.erp.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.domain.repository.ClientRepository;
import com.alphamail.api.erp.infrastructure.entity.ClientEntity;
import com.alphamail.api.erp.infrastructure.mapping.ClientMapper;
import com.alphamail.api.organization.domain.entity.Company;

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

	@Override
	public Optional<Client> duplicateClient(Integer companyId, Integer groupId, String licenseNum) {
		return clientJpaRepository
			.findDuplicateClient(companyId, groupId, licenseNum)
			.map(clientMapper::toDomain);
	}

	@Override
	public Client save(Client client) {
		ClientEntity entity = clientMapper.toEntity(client);
		ClientEntity savedEntity = clientJpaRepository.save(entity);

		return clientMapper.toDomain(savedEntity);
	}
}
