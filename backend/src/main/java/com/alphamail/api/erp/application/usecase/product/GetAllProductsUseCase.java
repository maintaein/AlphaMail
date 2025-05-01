package com.alphamail.api.erp.application.usecase.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.ProductRepository;
import com.alphamail.api.erp.presentation.dto.product.GetAllProductsResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetAllProductsUseCase {

	private final ProductRepository productRepository;

	public Page<GetAllProductsResponse> execute(Integer companyId, String name, Pageable pageable) {
		if (name != null && !name.isBlank()) {
			return productRepository
				.findByCompanyIdAndNameContaining(companyId, name, pageable)
				.map(GetAllProductsResponse::from);
		}

		return productRepository
			.findByCompanyId(companyId, pageable)
			.map(GetAllProductsResponse::from);
	}
}
