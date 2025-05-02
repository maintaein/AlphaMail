package com.alphamail.api.erp.application.usecase.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.ProductRepository;
import com.alphamail.api.erp.presentation.dto.product.GetAllProductsResponse;
import com.alphamail.api.global.dto.GetPageResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetAllProductsUseCase {

	private final ProductRepository productRepository;

	public GetPageResponse<GetAllProductsResponse> execute(Integer companyId, String name, Pageable pageable) {
		Page<GetAllProductsResponse> page;

		if (name != null && !name.isBlank()) {
			page = productRepository
				.findByCompanyIdAndNameContainingIgnoreCase(companyId, name, pageable)
				.map(GetAllProductsResponse::from);
		} else {
			page = productRepository
				.findByCompanyId(companyId, pageable)
				.map(GetAllProductsResponse::from);
		}

		return GetPageResponse.from(page);
	}
}
