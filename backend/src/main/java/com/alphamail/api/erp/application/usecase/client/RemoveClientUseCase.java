package com.alphamail.api.erp.application.usecase.client;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.domain.repository.ClientRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemoveClientUseCase {

	private final ClientRepository clientRepository;

	public boolean execute(Integer clientId) {
		Client client = clientRepository.findById(clientId).orElse(null);
		if (client == null) {
			return false;
		}

		clientRepository.softDeleteById(clientId);
		return true;
	}
}
