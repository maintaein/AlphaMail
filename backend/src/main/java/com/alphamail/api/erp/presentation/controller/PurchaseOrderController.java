package com.alphamail.api.erp.presentation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphamail.api.erp.application.usecase.purchaseorder.GetPurchaseOrderUseCase;
import com.alphamail.api.erp.presentation.dto.purchaseorder.GetPurchaseOrderResponse;
import com.alphamail.common.constants.ApiPaths;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.ERP_BASE_API)
public class PurchaseOrderController {

	private final GetPurchaseOrderUseCase getPurchaseOrderUseCase;

	// 발주서 상세 조회
	@GetMapping(ApiPaths.ORDERS_BASE_API + "/{orderId}")
	public ResponseEntity<GetPurchaseOrderResponse> get(@PathVariable Integer orderId) {
		System.out.println("컨트롤러 실행중");
		GetPurchaseOrderResponse response = getPurchaseOrderUseCase.execute(orderId);

		if (response == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.ok(response);
	}

}
