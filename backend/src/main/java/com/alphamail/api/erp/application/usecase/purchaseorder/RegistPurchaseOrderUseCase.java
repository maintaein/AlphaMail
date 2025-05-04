package com.alphamail.api.erp.application.usecase.purchaseorder;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.entity.PurchaseOrderProduct;
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

	public PurchaseOrder execute(RegistPurchaseOrderRequest request) {
		User user = userReader.findById(request.userId());

		if (user == null) {
			return null;
		}
		PurchaseOrder order = PurchaseOrder.create(request, user);

		return purchaseOrderRepository.save(order);
	}
}
