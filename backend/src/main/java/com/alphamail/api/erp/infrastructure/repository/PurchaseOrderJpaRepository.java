package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;

@Repository
public interface PurchaseOrderJpaRepository extends JpaRepository<PurchaseOrderEntity, Integer>,
	JpaSpecificationExecutor<PurchaseOrderEntity> {

	@EntityGraph(attributePaths = {"products", "products.productEntity"})
	Optional<PurchaseOrderEntity> findByIdAndDeletedAtIsNull(Integer orderId);

	@Modifying
	@Transactional
	@Query("UPDATE PurchaseOrderEntity p SET p.deletedAt = CURRENT_TIMESTAMP WHERE p.id IN :ids")
	void deleteAllByIds(@Param("ids") List<Integer> ids);

	@Modifying
	@Transactional
	@Query("UPDATE PurchaseOrderEntity p SET p.deletedAt = CURRENT_TIMESTAMP WHERE p.id = :orderId AND p.deletedAt IS NULL")
	void softDeleteById(@Param("orderId") Integer orderId);
}
