package com.alphamail.api.assistants.infrastructure.adapter;

import com.alphamail.api.assistants.domain.service.ClientStore;
import com.alphamail.api.erp.domain.repository.ClientRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ClientStoreImpl implements ClientStore {

	private final ClientRepository clientRepository;


}
