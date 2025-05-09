package com.alphamail.api.erp.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	public Page<Client> findByCompanyId(Integer companyId, Pageable pageable) {
		return clientJpaRepository
			.findByCompanyId(companyId, pageable)
			.map(clientMapper::toDomain);
	}

	@Override
	public Page<Client> findByCompanyIdAndQuery(Integer companyId, String query, Pageable pageable) {
		return clientJpaRepository
			.findByCompanyIdAndQuery(companyId, query, pageable)
			.map(clientMapper::toDomain);
	}

	@Override
	public Optional<Client> findById(Integer id) {
		return clientJpaRepository.findByIdAndDeletedAtIsNull(id)
			.map(clientMapper::toDomain);
	}

	@Override
	public Optional<Client> duplicateClient(Integer groupId, String licenseNum) {
		return clientJpaRepository
			.findDuplicateClient(groupId, licenseNum)
			.map(clientMapper::toDomain);
	}

	@Override
	public Client save(Client client) {
		ClientEntity entity = clientMapper.toEntity(client);
		ClientEntity savedEntity = clientJpaRepository.save(entity);

		return clientMapper.toDomain(savedEntity);
	}

	@Override
	public void softDeleteById(Integer clientId) {
		clientJpaRepository.softDeleteById(clientId);
	}
}
