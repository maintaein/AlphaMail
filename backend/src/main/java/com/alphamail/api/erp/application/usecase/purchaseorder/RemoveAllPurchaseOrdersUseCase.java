package com.alphamail.api.erp.application.usecase.purchaseorder;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.global.dto.RemoveAllErpRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemoveAllPurchaseOrdersUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;

	public boolean execute(List<Integer> orderIds) {
		if (orderIds == null || orderIds.isEmpty()) {
			return false;
		}

		purchaseOrderRepository.deleteAllByIds(orderIds);
		return true;
	}
}
