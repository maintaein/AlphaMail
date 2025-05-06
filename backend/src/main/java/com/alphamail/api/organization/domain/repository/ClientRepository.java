package com.alphamail.api.organization.domain.repository;

import com.alphamail.api.organization.domain.entity.Client;

public interface ClientRepository {

	Client findById(Integer id);
}
