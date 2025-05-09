package com.alphamail.api.erp.domain.repository;

import java.util.Optional;

import com.alphamail.api.erp.domain.entity.Client;

public interface ClientRepository {

	Optional<Client> findById(Integer clientId);

	Optional<Client> duplicateClient(Integer groupId, String licenseNum);

	Client save(Client client);
}
