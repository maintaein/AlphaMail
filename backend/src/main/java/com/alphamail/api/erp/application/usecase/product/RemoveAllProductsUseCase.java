package com.alphamail.api.erp.application.usecase.product;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.ProductRepository;
import com.alphamail.api.global.dto.RemoveAllErpRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemoveAllProductsUseCase {

	private final ProductRepository productRepository;

	public boolean execute(List<Integer> productIds) {
		if (productIds == null || productIds.isEmpty()) {
			return false;
		}

		productRepository.deleteAllByIds(productIds);
		return true;
	}
}
