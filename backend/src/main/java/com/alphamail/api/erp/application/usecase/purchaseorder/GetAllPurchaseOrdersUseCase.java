package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.presentation.dto.purchaseorder.GetAllPurchaseOrdersResponse;
import com.alphamail.api.erp.presentation.dto.purchaseorder.PurchaseOrderSearchCondition;
import com.alphamail.api.global.dto.GetPageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetAllPurchaseOrdersUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;

	public GetPageResponse<GetAllPurchaseOrdersResponse> execute(PurchaseOrderSearchCondition condition,
		Pageable pageable) {
		Page<GetAllPurchaseOrdersResponse> page = purchaseOrderRepository.findAllByCondition(condition, pageable);
		return GetPageResponse.from(page);
	}
}
