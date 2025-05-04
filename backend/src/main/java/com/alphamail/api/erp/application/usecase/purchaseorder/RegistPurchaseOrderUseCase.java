package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.domain.service.UserReader;
import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;
import com.alphamail.api.user.domain.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistPurchaseOrderUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;
	private final UserReader userReader;

	public RegistResultDto execute(RegistPurchaseOrderRequest request) {
		User user = userReader.findById(request.userId());

		if (user == null) {
			return RegistResultDto.badRequest();
		}
		PurchaseOrder order = PurchaseOrder.create(request, user);
		PurchaseOrder savedOrder = purchaseOrderRepository.save(order);

		if (savedOrder == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedOrder.getPurchaseOrderId());
	}
}
