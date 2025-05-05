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

	public boolean execute(RemoveAllErpRequest request) {
		List<Integer> ids = request.ids();
		if (ids == null || ids.isEmpty()) {
			return false;
		}

		List<PurchaseOrder> orders = purchaseOrderRepository.findAllByIds(ids);

		for (PurchaseOrder order : orders) {
			order.softDelete();
			purchaseOrderRepository.save(order);
		}
		return true;
	}
}
