package com.alphamail.api.erp.application.usecase.client;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.domain.repository.ClientRepository;
import com.alphamail.api.erp.domain.service.CompanyReader;
import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.erp.presentation.dto.client.RegistClientRequest;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.entity.Group;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistClientUseCase {

	private final ClientRepository clientRepository;
	private final CompanyReader companyReader;
	private final GroupReader groupReader;

	public RegistResultDto execute(RegistClientRequest request) {
		Company company = companyReader.findById(request.companyId());
		Group group = groupReader.findById(request.groupId());

		if (company == null || group == null) {
			return RegistResultDto.badRequest();
		}
		Optional<Client> duplicateClient = clientRepository.duplicateClient(
			request.groupId(), request.licenseNum());

		if (duplicateClient.isPresent()) {
			return RegistResultDto.duplicated();
		}

		Client client = Client.create(request, company, group);
		Client savedClient = clientRepository.save(client);

		if (savedClient == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedClient.getClientId());
	}
}
