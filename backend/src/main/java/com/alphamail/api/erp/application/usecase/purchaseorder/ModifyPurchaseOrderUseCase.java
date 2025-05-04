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
public class ModifyPurchaseOrderUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;
	private final UserReader userReader;

	public RegistResultDto execute(Integer orderId, RegistPurchaseOrderRequest request) {
		PurchaseOrder order = purchaseOrderRepository.findById(orderId).orElse(null);

		if (order == null) {
			return RegistResultDto.notFound();
		}

		if (request.userId() != null && !request.userId().equals(order.getUser().getId().getValue())) {
			User newUser = userReader.findById(request.userId());

			if (newUser == null) {
				return RegistResultDto.badRequest();
			}
			order.updateUser(newUser);
		}

		order.update(request);
		PurchaseOrder savedOrder = purchaseOrderRepository.save(order);

		if (savedOrder == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedOrder.getPurchaseOrderId());
	}
}
