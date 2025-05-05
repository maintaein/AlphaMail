package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;
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

	@Override
	public PurchaseOrder save(PurchaseOrder purchaseOrder) {
		PurchaseOrderEntity entity = purchaseOrderMapper.toEntity(purchaseOrder);

		entity.setProducts(
			entity.getProducts().stream()
				.peek(product -> product.setPurchaseOrderEntity(entity))
				.collect(Collectors.toList())
		);

		PurchaseOrderEntity savedOrderEntity = purchaseOrderJpaRepository.save(entity);

		return purchaseOrderMapper.toDomain(savedOrderEntity);
	}

	@Override
	public List<PurchaseOrder> findAllByIds(List<Integer> ids) {
		return purchaseOrderJpaRepository.findAllById(ids).stream()
			.map(purchaseOrderMapper::toDomain)
			.collect(Collectors.toList());
	}
}
