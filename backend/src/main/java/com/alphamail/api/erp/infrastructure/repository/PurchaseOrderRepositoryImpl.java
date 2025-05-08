package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;
import com.alphamail.api.erp.infrastructure.mapping.PurchaseOrderMapper;
import com.alphamail.api.erp.infrastructure.specification.PurchaseOrderSpecification;
import com.alphamail.api.erp.presentation.dto.purchaseorder.PurchaseOrderSearchCondition;
import com.alphamail.api.organization.domain.entity.Company;
import com.alphamail.api.organization.infrastructure.entity.CompanyEntity;
import com.alphamail.api.organization.infrastructure.mapping.CompanyMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PurchaseOrderRepositoryImpl implements PurchaseOrderRepository {

	private final PurchaseOrderJpaRepository purchaseOrderJpaRepository;
	private final PurchaseOrderMapper purchaseOrderMapper;
	private final CompanyMapper companyMapper;

	@Override
	public Page<PurchaseOrder> findAllByCondition(Company company, PurchaseOrderSearchCondition condition,
		Pageable pageable) {
		CompanyEntity companyEntity = companyMapper.toEntity(company);

		Specification<PurchaseOrderEntity> spec = Specification
			.where(PurchaseOrderSpecification.notDeleted())
			.and(PurchaseOrderSpecification.hasClientName(condition.clientName()))
			.and(PurchaseOrderSpecification.hasUserName(condition.userName()))
			.and(PurchaseOrderSpecification.hasOrderNo(condition.orderNo()))
			.and(PurchaseOrderSpecification.hasProductName(condition.productName()))
			.and(PurchaseOrderSpecification.betweenDates(condition.startDate(), condition.endDate()));

		spec = spec.and((root, query, cb) -> cb.equal(root.get("companyEntity"), companyEntity));

		return purchaseOrderJpaRepository.findAll(spec, pageable)
			.map(purchaseOrderMapper::toDomain);
	}

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
	public void deleteAllByIds(List<Integer> orderIds) {
		purchaseOrderJpaRepository.deleteAllByIds(orderIds);
	}

	@Override
	public void softDeleteById(Integer orderId) {
		purchaseOrderJpaRepository.softDeleteById(orderId);
	}
}
