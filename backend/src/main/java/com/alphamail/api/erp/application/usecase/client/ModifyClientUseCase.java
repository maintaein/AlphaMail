package com.alphamail.api.erp.application.usecase.client;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.domain.repository.ClientRepository;
import com.alphamail.api.erp.presentation.dto.client.RegistClientRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ModifyClientUseCase {

	private final ClientRepository clientRepository;

	public RegistResultDto execute(Integer clientId, RegistClientRequest request) {
		Client client = clientRepository.findById(clientId).orElse(null);

		if (client == null) {
			return RegistResultDto.notFound();
		}

		client.update(request);
		Client savedClient = clientRepository.save(client);

		if (savedClient == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedClient.getClientId());
	}
}
