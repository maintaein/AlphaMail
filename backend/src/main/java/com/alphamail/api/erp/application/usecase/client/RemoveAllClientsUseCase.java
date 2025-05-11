package com.alphamail.api.erp.application.usecase.client;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.ClientRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemoveAllClientsUseCase {

	private final ClientRepository clientRepository;

	public boolean execute(List<Integer> clientIds) {
		if (clientIds == null || clientIds.isEmpty()) {
			return false;
		}

		clientRepository.deleteAllByIds(clientIds);
		return true;
	}
}
