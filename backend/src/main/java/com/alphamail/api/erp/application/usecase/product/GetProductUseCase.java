package com.alphamail.api.erp.application.usecase.product;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.Product;
import com.alphamail.api.erp.domain.repository.ProductRepository;
import com.alphamail.api.erp.presentation.dto.product.GetProductResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetProductUseCase {

	private final ProductRepository productRepository;

	public GetProductResponse execute(Integer productId) {
		Optional<Product> product = productRepository.findById(productId);

		return product.map(GetProductResponse::from).orElse(null);
	}
}
