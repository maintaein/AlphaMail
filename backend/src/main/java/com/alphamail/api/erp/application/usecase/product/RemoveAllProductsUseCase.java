package com.alphamail.api.erp.application.usecase.product;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.ProductRepository;
import com.alphamail.api.erp.presentation.dto.product.RemoveAllProductsRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemoveAllProductsUseCase {

	private final ProductRepository productRepository;

	public boolean execute(RemoveAllProductsRequest request) {
		List<Integer> ids = request.ids();
		if (ids == null || ids.isEmpty()) {
			return false;
		}

		productRepository.deleteAllByIds(ids);
		return true;
	}
}
