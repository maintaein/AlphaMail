package com.alphamail.api.erp.domain.repository;

import java.util.List;
import java.util.Optional;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;

public interface PurchaseOrderRepository {

	Optional<PurchaseOrder> findById(Integer orderId);

	PurchaseOrder save(PurchaseOrder purchaseOrder);

	List<PurchaseOrder> findAllByIds(List<Integer> ids);
}
