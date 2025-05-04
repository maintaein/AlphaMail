package com.alphamail.api.erp.infrastructure.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderProductEntity;
import com.alphamail.api.erp.infrastructure.mapping.PurchaseOrderMapper;
import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.api.user.infrastructure.repository.UserJpaRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PurchaseOrderRepositoryImpl implements PurchaseOrderRepository {

	private final UserJpaRepository userJpaRepository;
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

		UserEntity user = userJpaRepository.findById(purchaseOrder.getUser().getId().getValue())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

		entity.setUserEntity(user);

		entity.setProducts(
			entity.getProducts().stream()
				.peek(product -> product.setPurchaseOrderEntity(entity))
				.collect(Collectors.toList())
		);

		PurchaseOrderEntity savedOrderEntity = purchaseOrderJpaRepository.save(entity);

		return purchaseOrderMapper.toDomain(savedOrderEntity);
	}
}
