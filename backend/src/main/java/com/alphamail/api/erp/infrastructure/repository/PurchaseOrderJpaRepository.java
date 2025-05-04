package com.alphamail.api.erp.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;

@Repository
public interface PurchaseOrderJpaRepository extends JpaRepository<PurchaseOrderEntity, Integer> {

	@EntityGraph(attributePaths = {"products", "products.productEntity"})
	Optional<PurchaseOrderEntity> findById(Integer orderId);
}
