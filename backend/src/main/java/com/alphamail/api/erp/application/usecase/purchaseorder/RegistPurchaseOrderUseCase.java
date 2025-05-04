package com.alphamail.api.erp.application.usecase.purchaseorder;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.entity.PurchaseOrderProduct;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistPurchaseOrderUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;

	public PurchaseOrder execute(RegistPurchaseOrderRequest request) {
		PurchaseOrder order = PurchaseOrder.create(request);

		return purchaseOrderRepository.save(order);
	}
}
