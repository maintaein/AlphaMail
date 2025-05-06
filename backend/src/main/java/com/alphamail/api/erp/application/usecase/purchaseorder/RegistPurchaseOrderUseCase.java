package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.application.dto.RegistResultDto;
import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.domain.service.ClientReader;
import com.alphamail.api.erp.domain.service.CompanyReader;
import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.erp.domain.service.UserReader;
import com.alphamail.api.erp.presentation.dto.purchaseorder.RegistPurchaseOrderRequest;
import com.alphamail.api.organization.domain.entity.Client;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.domain.entity.Group;
import com.alphamail.api.user.domain.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RegistPurchaseOrderUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;
	private final UserReader userReader;
	private final GroupReader groupReader;
	private final ClientReader clientReader;
	private final CompanyReader companyReader;

	public RegistResultDto execute(RegistPurchaseOrderRequest request) {
		User user = userReader.findById(request.userId());
		Company company = companyReader.findById(request.companyId());
		Group group = groupReader.findById(request.groupId());
		Client client = clientReader.findById(request.clientId());

		log.info("user: {}, company: {}, group: {}", user, company, group);

		if (user == null || company == null || group == null || client == null) {
			return RegistResultDto.badRequest();
		}
		PurchaseOrder order = PurchaseOrder.create(request, user, company, group, client);
		PurchaseOrder savedOrder = purchaseOrderRepository.save(order);

		if (savedOrder == null) {
			return RegistResultDto.saveFailed();
		}

		return RegistResultDto.saveSuccess(savedOrder.getPurchaseOrderId());
	}
}
