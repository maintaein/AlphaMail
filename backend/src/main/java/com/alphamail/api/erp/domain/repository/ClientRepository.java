package com.alphamail.api.erp.domain.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.alphamail.api.erp.domain.entity.Client;

public interface ClientRepository {

	Page<Client> findByCompanyId(Integer companyId, Pageable pageable);

	Page<Client> findByCompanyIdAndQuery(Integer companyId, String query, Pageable pageable);

	Optional<Client> findById(Integer clientId);

	Optional<Client> duplicateClient(Integer groupId, String licenseNum);

	Client save(Client client);

	void softDeleteById(Integer clientId);
}
