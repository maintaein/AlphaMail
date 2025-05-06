package com.alphamail.api.erp.infrastructure.adapter;

import org.springframework.stereotype.Component;

import com.alphamail.api.erp.domain.service.ClientReader;
import com.alphamail.api.organization.domain.entity.Client;
import com.alphamail.api.organization.domain.repository.ClientRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ClientReaderImpl implements ClientReader {

	private final ClientRepository clientRepository;

	@Override
	public Client findById(Integer id) {
		return clientRepository.findById(id);
	}
}
