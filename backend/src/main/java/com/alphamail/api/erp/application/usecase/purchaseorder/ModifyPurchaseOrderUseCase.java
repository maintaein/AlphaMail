package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.domain.service.ClientReader;
import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.erp.domain.service.UserReader;
import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ModifyPurchaseOrderUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;
	private final UserReader userReader;
	private final GroupReader groupReader;
	private final ClientReader clientReader;

	public RegistResultDto execute(Integer orderId, RegistPurchaseOrderRequest request) {
		PurchaseOrder order = purchaseOrderRepository.findById(orderId).orElse(null);

		if (order == null) {
			return RegistResultDto.notFound();
		} else if (order.getDeletedAt() != null) {
			return RegistResultDto.notFound();
		}

		if (request.userId() != null && !request.userId().equals(order.getUser().getId().getValue())) {
			User newUser = userReader.findById(request.userId());

			if (newUser == null) {
				return RegistResultDto.badRequest();
			}
			order.updateUser(newUser);
		}

		if (request.groupId() != null && !request.groupId().equals(order.getGroup().getGroupId())) {
			Group newGroup = groupReader.findById(request.groupId());

			if (newGroup == null) {
				return RegistResultDto.badRequest();
			}
			order.updateGroup(newGroup);
		}

		if (request.clientId() != null && !request.clientId().equals(order.getClient().getClientId())) {
			Client newClient = clientReader.findById(request.clientId());

			if (newClient == null) {
				return RegistResultDto.badRequest();
			}
			order.updateClient(newClient);
		}

		order.update(request);
		PurchaseOrder savedOrder = purchaseOrderRepository.save(order);

		if (savedOrder == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedOrder.getPurchaseOrderId());
	}
}
