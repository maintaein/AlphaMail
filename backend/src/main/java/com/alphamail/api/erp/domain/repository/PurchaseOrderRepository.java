package com.alphamail.api.erp.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.presentation.dto.purchaseorder.PurchaseOrderSearchCondition;
import com.alphamail.api.organization.domain.entity.Company;

public interface PurchaseOrderRepository {

	Page<PurchaseOrder> findAllByCondition(Company company, PurchaseOrderSearchCondition condition, Pageable pageable);

	Optional<PurchaseOrder> findById(Integer orderId);

	PurchaseOrder save(PurchaseOrder purchaseOrder);

	List<PurchaseOrder> findAllByIds(List<Integer> ids);
}
