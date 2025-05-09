package com.alphamail.api.erp.infrastructure.adapter;

import org.springframework.stereotype.Component;

import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.domain.repository.ClientRepository;
import com.alphamail.api.erp.domain.service.ClientReader;

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
