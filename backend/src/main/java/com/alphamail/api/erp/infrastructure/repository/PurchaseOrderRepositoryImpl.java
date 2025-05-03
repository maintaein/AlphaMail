package com.alphamail.api.erp.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.infrastructure.mapping.PurchaseOrderMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PurchaseOrderRepositoryImpl implements PurchaseOrderRepository {

	private final PurchaseOrderJpaRepository purchaseOrderJpaRepository;
	private final PurchaseOrderMapper purchaseOrderMapper;

	@Override
	public Optional<PurchaseOrder> findById(Integer orderId) {
		return purchaseOrderJpaRepository.findById(orderId)
			.map(purchaseOrderMapper::toDomain);
	}
}
