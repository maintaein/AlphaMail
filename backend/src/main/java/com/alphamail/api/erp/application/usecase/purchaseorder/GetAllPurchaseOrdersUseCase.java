package com.alphamail.api.erp.application.usecase.purchaseorder;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.domain.service.CompanyReader;
import com.alphamail.api.erp.domain.service.GroupReader;
import com.alphamail.api.erp.presentation.dto.purchaseorder.GetAllPurchaseOrdersResponse;
import com.alphamail.api.erp.presentation.dto.purchaseorder.PurchaseOrderSearchCondition;
import com.alphamail.api.global.dto.GetPageResponse;
import com.alphamail.api.organization.domain.entity.Company;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetAllPurchaseOrdersUseCase {

	private final PurchaseOrderRepository purchaseOrderRepository;
	private final CompanyReader companyReader;

	public GetPageResponse<GetAllPurchaseOrdersResponse> execute(Integer companyId,
		PurchaseOrderSearchCondition condition, Pageable pageable) {
		Company company = companyReader.findById(companyId);

		Page<GetAllPurchaseOrdersResponse> page = purchaseOrderRepository.findAllByCondition(company, condition,
				pageable)
			.map(GetAllPurchaseOrdersResponse::from);
		return GetPageResponse.from(page);
	}
}
