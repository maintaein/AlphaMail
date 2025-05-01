package com.alphamail.api.erp.presentation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.erp.application.usecase.product.RegistProductUseCase;
import com.alphamail.api.erp.presentation.dto.product.RegistProductRequest;
import com.alphamail.api.erp.presentation.dto.product.RegistProductResult;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.ERP_BASE_API)
public class ProductController {

	private final RegistProductUseCase registProductUseCase;

	// 품목 등록하기
	@PostMapping("/products")
	public ResponseEntity<Void> regist(@RequestBody RegistProductRequest registProductRequest) {
		RegistProductResult result = registProductUseCase.execute(registProductRequest);

		return switch (result.status()) {
			case SUCCESS -> ResponseEntity.status(HttpStatus.CREATED).build();
			case DUPLICATED -> ResponseEntity.status(HttpStatus.CONFLICT).build();
			case SAVE_FAILED -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		};
	}

}
