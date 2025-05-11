package com.alphamail.api.erp.application.usecase.client;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.domain.repository.ClientRepository;
import com.alphamail.api.erp.presentation.dto.client.GetClientResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetClientUseCase {

	private final ClientRepository clientRepository;

	public GetClientResponse execute(Integer clientId) {
		Client client = clientRepository.findById(clientId).orElse(null);

		if (client == null) {
			return null;
		}

		return GetClientResponse.from(client);
	}
}
