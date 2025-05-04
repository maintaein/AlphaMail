package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RemovePurchaseOrderUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;

	public boolean execute(Integer orderId) {
		if (purchaseOrderRepository.findById(orderId).isEmpty()) {
			return false;
		}

		// 다중삭제와 같은 로직이 와야합니다.
		return true;
	}
}
