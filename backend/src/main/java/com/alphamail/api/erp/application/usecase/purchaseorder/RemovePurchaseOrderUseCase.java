package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemovePurchaseOrderUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;

	public boolean execute(Integer orderId) {
		PurchaseOrder purchaseOrder = purchaseOrderRepository.findById(orderId).orElse(null);
		if (purchaseOrder == null) {
			return false;
		} else if (purchaseOrder.getDeletedAt() != null) {
			return false;
		}

		purchaseOrderRepository.softDeleteById(orderId);
		return true;
	}
}
