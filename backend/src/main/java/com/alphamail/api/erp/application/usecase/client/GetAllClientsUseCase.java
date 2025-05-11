package com.alphamail.api.erp.application.usecase.client;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.ClientRepository;
import com.alphamail.api.erp.presentation.dto.client.GetAllClientsResponse;
import com.alphamail.api.global.dto.GetPageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetAllClientsUseCase {

	private final ClientRepository clientRepository;

	public GetPageResponse<GetAllClientsResponse> execute(Integer companyId, String query, Pageable pageable) {
		Page<GetAllClientsResponse> page;

		if (query != null && !query.isBlank()) {
			page = clientRepository.findByCompanyIdAndQuery(companyId, query, pageable)
				.map(GetAllClientsResponse::from);
		} else {
			page = clientRepository.findByCompanyId(companyId, pageable)
				.map(GetAllClientsResponse::from);
		}

		return GetPageResponse.from(page);
	}
}
