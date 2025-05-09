package com.alphamail.api.erp.domain.repository;

import java.util.Optional;

import com.alphamail.api.erp.domain.entity.Client;

public interface ClientRepository {

	Client findById(Integer id);

	Optional<Client> duplicateClient(Integer companyId, Integer groupId, String licenseNum);

	Client save(Client client);
}
