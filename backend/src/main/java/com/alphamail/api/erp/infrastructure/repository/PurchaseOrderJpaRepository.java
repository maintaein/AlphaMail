package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.infrastructure.entity.PurchaseOrderEntity;

@Repository
public interface PurchaseOrderJpaRepository extends JpaRepository<PurchaseOrderEntity, Integer> {

	@Query("SELECT p FROM PurchaseOrderEntity p WHERE p.deletedAt IS NULL")
	List<PurchaseOrderEntity> findAllNotDeleted();

	@EntityGraph(attributePaths = {"products", "products.productEntity"})
	Optional<PurchaseOrderEntity> findById(Integer orderId);
}
