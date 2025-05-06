package com.alphamail.api.erp.presentation.controller;

import java.time.LocalDateTime;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
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
import com.alphamail.api.erp.application.usecase.purchaseorder.GetAllPurchaseOrdersUseCase;
import com.alphamail.api.erp.application.usecase.purchaseorder.GetPurchaseOrderUseCase;
import com.alphamail.api.erp.application.usecase.purchaseorder.ModifyPurchaseOrderUseCase;
import com.alphamail.api.erp.application.usecase.purchaseorder.RegistPurchaseOrderUseCase;
import com.alphamail.api.erp.application.usecase.purchaseorder.RemoveAllPurchaseOrdersUseCase;
import com.alphamail.api.erp.application.usecase.purchaseorder.RemovePurchaseOrderUseCase;
import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.presentation.dto.purchaseorder.GetAllPurchaseOrdersResponse;
import com.alphamail.api.erp.presentation.dto.purchaseorder.GetPurchaseOrderResponse;
import com.alphamail.api.erp.presentation.dto.purchaseorder.PurchaseOrderSearchCondition;
import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;
import com.alphamail.api.global.dto.GetPageResponse;
import com.alphamail.api.global.dto.RegistErpResponse;
import com.alphamail.api.global.dto.RemoveAllErpRequest;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.ERP_BASE_API)
public class PurchaseOrderController {

	private final GetPurchaseOrderUseCase getPurchaseOrderUseCase;
	private final RegistPurchaseOrderUseCase registPurchaseOrderUseCase;
	private final ModifyPurchaseOrderUseCase modifyPurchaseOrderUseCase;
	private final GetAllPurchaseOrdersUseCase getAllPurchaseOrdersUseCase;
	private final RemoveAllPurchaseOrdersUseCase removeAllPurchaseOrdersUseCase;
	private final RemovePurchaseOrderUseCase removePurchaseOrderUseCase;

	// 발주서 전체 조회
	@GetMapping(ApiPaths.COMPANIES_BASE_API + ApiPaths.ORDERS_BASE_API)
	public ResponseEntity<GetPageResponse<GetAllPurchaseOrdersResponse>> getAll(
		@PathVariable Integer companyId,
		@RequestParam(required = false) String clientName,
		@RequestParam(required = false) String orderNo,
		@RequestParam(required = false) String userName,
		@RequestParam(required = false) String productName,
		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size
	) {
		PurchaseOrderSearchCondition condition = new PurchaseOrderSearchCondition(
			clientName, orderNo, userName, productName, startDate, endDate);
		Pageable pageable = PageRequest.of(page, size);

		GetPageResponse<GetAllPurchaseOrdersResponse> response = getAllPurchaseOrdersUseCase.execute(companyId,
			condition,
			pageable);

		return ResponseEntity.ok(response);
	}

	// 발주서 상세 조회
	@GetMapping(ApiPaths.ORDERS_BASE_API + "/{orderId}")
	public ResponseEntity<GetPurchaseOrderResponse> get(@PathVariable Integer orderId) {
		GetPurchaseOrderResponse response = getPurchaseOrderUseCase.execute(orderId);

		if (response == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.ok(response);
	}

	// 발주서 등록하기
	@PostMapping(ApiPaths.ORDERS_BASE_API)
	public ResponseEntity<?> regist(@RequestBody RegistPurchaseOrderRequest request) {
		RegistResultDto result = registPurchaseOrderUseCase.execute(request);

		if (!result.isDone()) {
			if (result.status() == RegistResultDto.Status.BAD_REQUEST) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			} else if (result.status() == RegistResultDto.Status.SAVE_FAILED) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(new RegistErpResponse(result.id()));
	}

	// 발주서 수정하기
	@PutMapping(ApiPaths.ORDERS_BASE_API + "/{orderId}")
	public ResponseEntity<?> modify(@PathVariable Integer orderId, @RequestBody RegistPurchaseOrderRequest request) {
		RegistResultDto result = modifyPurchaseOrderUseCase.execute(orderId, request);

		if (!result.isDone()) {
			if (result.status() == RegistResultDto.Status.NOT_FOUND) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} else if (result.status() == RegistResultDto.Status.SAVE_FAILED) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			} else if (result.status() == RegistResultDto.Status.BAD_REQUEST) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		}

		return ResponseEntity.ok(new RegistErpResponse(result.id()));
	}

	// 발주서 다중 삭제
	@DeleteMapping(ApiPaths.ORDERS_BASE_API)
	public ResponseEntity<Void> delete(@RequestBody RemoveAllErpRequest request) {
		boolean deleted = removeAllPurchaseOrdersUseCase.execute(request);

		return deleted ? ResponseEntity.ok().build() :
			ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}

	// 발주서 삭제하기
	@DeleteMapping(ApiPaths.ORDERS_BASE_API + "/{orderId}")
	public ResponseEntity<Void> remove(@PathVariable Integer orderId) {
		boolean deleted = removePurchaseOrderUseCase.execute(orderId);

		return deleted ? ResponseEntity.ok().build() :
			ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
