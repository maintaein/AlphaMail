package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.PurchaseOrder;
import com.alphamail.api.erp.domain.repository.PurchaseOrderRepository;
import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;
import com.alphamail.api.erp.infrastructure.mapping.PurchaseOrderMapper;
import com.alphamail.api.erp.presentation.dto.purchaseorder.GetAllPurchaseOrdersResponse;
import com.alphamail.api.erp.presentation.dto.purchaseorder.PurchaseOrderSearchCondition;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PurchaseOrderRepositoryImpl implements PurchaseOrderRepository {

	private final PurchaseOrderJpaRepository purchaseOrderJpaRepository;
	private final PurchaseOrderMapper purchaseOrderMapper;

	@Override
	public Page<GetAllPurchaseOrdersResponse> findAllByCondition(PurchaseOrderSearchCondition condition, Pageable pageable) {
		QPurchaseOrderEntity po = QPurchaseOrderEntity.purchaseOrderEntity;
		QUserEntity user = QUserEntity.userEntity;
		QClientEntity client = QClientEntity.clientEntity;
		QPurchaseOrderProductEntity pop = QPurchaseOrderProductEntity.purchaseOrderProductEntity;
		QProductEntity product = QProductEntity.productEntity;

		JPAQueryFactory queryFactory = new JPAQueryFactory(EntityManagerProvider.get());

		// 메인 쿼리: 발주서 목록 조회
		JPAQuery<Tuple> query = queryFactory
			.select(po.id, po.orderNo, po.createdAt, user.name, client.name, po.deliverAt,
				pop.count.sum(), product.name, pop.price.sum())
			.from(po)
			.leftJoin(po.userEntity, user)
			.leftJoin(po.clientEntity, client)
			.leftJoin(po.products, pop)
			.leftJoin(pop.productEntity, product)
			.where(
				po.deletedAt.isNull(),
				eq(po.clientEntity.companyId, condition.getCompanyId()),
				containsIgnoreCase(client.name, condition.getClientName()),
				containsIgnoreCase(user.name, condition.getUserName()),
				containsIgnoreCase(po.orderNo, condition.getOrderNo()),
				productNameContains(product.name, condition.getProductName()),
				dateBetween(po.createdAt, condition.getStartDate(), condition.getEndDate())
			)
			.groupBy(po.id)
			.orderBy(po.createdAt.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize());

		List<Tuple> results = query.fetch();

		// 전체 카운트 쿼리
		Long total = queryFactory
			.select(po.count())
			.from(po)
			.leftJoin(po.clientEntity, client)
			.where(
				po.deletedAt.isNull(),
				eq(po.clientEntity.companyId, condition.getCompanyId()),
				containsIgnoreCase(client.name, condition.getClientName()),
				containsIgnoreCase(po.orderNo, condition.getOrderNo())
			)
			.fetchOne();

		List<GetAllPurchaseOrdersResponse> content = results.stream().map(tuple -> {
			return new GetAllPurchaseOrdersResponse(
				tuple.get(po.id),
				tuple.get(po.orderNo),
				tuple.get(po.createdAt),
				tuple.get(user.name),
				tuple.get(client.name),
				tuple.get(po.deliverAt),
				(int)(tuple.get(pop.count.sum()) != null ? tuple.get(pop.count.sum()) : 0),
				tuple.get(product.name),
				(long)(tuple.get(pop.price.sum()) != null ? tuple.get(pop.price.sum()) : 0)
			);
		}).toList();

		return new PageImpl<>(content, pageable, total) ;
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
	public List<PurchaseOrder> findAllByIds(List<Integer> ids) {
		return purchaseOrderJpaRepository.findAllById(ids).stream()
			.map(purchaseOrderMapper::toDomain)
			.collect(Collectors.toList());
	}
}
