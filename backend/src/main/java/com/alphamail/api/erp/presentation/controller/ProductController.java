package com.alphamail.api.erp.presentation.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.application.usecase.product.GetAllProductsUseCase;
import com.alphamail.api.erp.application.usecase.product.GetProductUseCase;
import com.alphamail.api.erp.application.usecase.product.ModifyProductUseCase;
import com.alphamail.api.erp.application.usecase.product.RegistProductUseCase;
import com.alphamail.api.erp.application.usecase.product.RemoveAllProductsUseCase;
import com.alphamail.api.erp.application.usecase.product.RemoveProductUseCase;
import com.alphamail.api.erp.presentation.dto.product.GetAllProductsResponse;
import com.alphamail.api.erp.presentation.dto.product.GetProductResponse;
import com.alphamail.api.erp.presentation.dto.product.ModifyProductRequest;
import com.alphamail.api.erp.presentation.dto.product.RegistProductRequest;
import com.alphamail.api.erp.presentation.dto.product.RemoveAllProductsRequest;
import com.alphamail.api.global.dto.GetPageResponse;
import com.alphamail.api.global.dto.RegistErpResponse;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.ERP_BASE_API)
public class ProductController {

	private final GetAllProductsUseCase getAllProductsUseCase;
	private final GetProductUseCase getProductUseCase;
	private final RegistProductUseCase registProductUseCase;
	private final ModifyProductUseCase modifyProductUseCase;
	private final RemoveAllProductsUseCase removeAllProductsUseCase;
	private final RemoveProductUseCase removeProductUseCase;

	// 품목 전체 조회
	@GetMapping(ApiPaths.COMPANIES_BASE_API + ApiPaths.PRODUCTS_BASE_API)
	public ResponseEntity<GetPageResponse<GetAllProductsResponse>> getAll(@PathVariable Integer companyId,
		@RequestParam(name = "query", required = false) String query, @RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "0") int sort) {
		Sort.Direction direction = sort == 0 ? Sort.Direction.ASC : Sort.Direction.DESC;
		Sort sortOption = Sort.by(direction, "name");

		Pageable pageable = PageRequest.of(page, size, sortOption);

		GetPageResponse<GetAllProductsResponse> response = getAllProductsUseCase.execute(companyId, query, pageable);

		return ResponseEntity.ok(response);
	}

	// 품목 상세 조회
	@GetMapping(ApiPaths.PRODUCTS_BASE_API + "/{productId}")
	public ResponseEntity<GetProductResponse> get(@PathVariable Integer productId) {
		GetProductResponse response = getProductUseCase.execute(productId);

		if (response == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.ok(response);
	}

	// 품목 등록하기
	@PostMapping(ApiPaths.PRODUCTS_BASE_API)
	public ResponseEntity<?> regist(@RequestBody RegistProductRequest registProductRequest) {
		RegistResultDto result = registProductUseCase.execute(registProductRequest);

		if (result.status() == RegistResultDto.Status.DUPLICATED) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		} else if (result.status() == RegistResultDto.Status.SAVE_FAILED) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(new RegistErpResponse(result.id()));
	}

	// 품목 수정하기
	@PutMapping(ApiPaths.PRODUCTS_BASE_API + "/{productId}")
	public ResponseEntity<?> modify(@PathVariable Integer productId,
		@RequestBody ModifyProductRequest modifyProductRequest) {
		RegistResultDto result = modifyProductUseCase.execute(productId, modifyProductRequest);

		if (result.status() == RegistResultDto.Status.NOT_FOUND) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} else if (result.status() == RegistResultDto.Status.SAVE_FAILED) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		return ResponseEntity.ok(new RegistErpResponse(result.id()));
	}

	// 품목 다중 삭제하기
	@DeleteMapping(ApiPaths.PRODUCTS_BASE_API)
	public ResponseEntity<Void> removeAll(@RequestBody RemoveAllProductsRequest removeAllProductsRequest) {
		boolean deleted = removeAllProductsUseCase.execute(removeAllProductsRequest);

		return deleted ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
			ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}

	// 품목 삭제하기
	@DeleteMapping(ApiPaths.PRODUCTS_BASE_API + "/{productId}")
	public ResponseEntity<Void> remove(@PathVariable Integer productId) {
		boolean deleted = removeProductUseCase.execute(productId);

		return deleted ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
			ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

}
