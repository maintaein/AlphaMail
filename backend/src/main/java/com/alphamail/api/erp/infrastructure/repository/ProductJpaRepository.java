package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.infrastructure.entity.ProductEntity;

@Repository
public interface ProductJpaRepository extends JpaRepository<ProductEntity, Integer> {

	Page<ProductEntity> findByCompanyIdAndDeletedAtIsNull(Integer companyId, Pageable pageable);

	Page<ProductEntity> findByCompanyIdAndNameContainingIgnoreCaseAndDeletedAtIsNull(Integer companyId, String name,
		Pageable pageable);

	Optional<ProductEntity> findByIdAndDeletedAtIsNull(Integer id);

	Optional<ProductEntity> findByCompanyIdAndNameAndStandardAndInboundPriceAndDeletedAtIsNull(Integer companyId,
		String name, String standard, Long inboundPrice);

	@Modifying
	@Transactional
	@Query("UPDATE ProductEntity p SET p.deletedAt = CURRENT_TIMESTAMP WHERE p.id IN :ids")
	void deleteAllByIds(@Param("ids") List<Integer> ids);

	@Modifying
	@Transactional
	@Query("UPDATE ProductEntity p SET p.deletedAt = CURRENT_TIMESTAMP WHERE p.id = :productId AND p.deletedAt IS NULL")
	void softDeleteById(Integer productId);
}
