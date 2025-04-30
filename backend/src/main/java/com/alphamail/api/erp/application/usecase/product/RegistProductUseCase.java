package com.alphamail.api.erp.application.usecase.product;

import org.springframework.stereotype.Service;

import com.alphamail.api.erp.domain.entity.Product;
import com.alphamail.api.erp.domain.repository.ProductRepository;
import com.alphamail.api.erp.presentation.dto.product.RegistProductRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistProductUseCase {

	private final ProductRepository productRepository;

	public boolean execute(RegistProductRequest request) {

		// 중복체크 repository를 불러와서 확인할 것
		Product product = Product.create(request);
		Product savedProduct = productRepository.save(product);

		return savedProduct != null;
	}

}
