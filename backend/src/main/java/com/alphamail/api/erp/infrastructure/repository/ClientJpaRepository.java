package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.infrastructure.entity.ClientEntity;
import com.alphamail.api.organization.infrastructure.entity.CompanyEntity;

@Repository
public interface ClientJpaRepository extends JpaRepository<ClientEntity, Integer> {

	@Query("SELECT c FROM ClientEntity c WHERE c.companyEntity.id = :companyId AND c.deletedAt IS NULL")
	Page<ClientEntity> findByCompanyId(
		@Param("companyId") Integer companyId,
		Pageable pageable
	);

	@Query("SELECT c FROM ClientEntity c WHERE c.companyEntity.id = :companyId AND c.deletedAt IS NULL AND (LOWER(c.corpName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.licenseNum) LIKE LOWER(CONCAT('%', :query, '%')))")
	Page<ClientEntity> findByCompanyIdAndQuery(
		@Param("companyId") Integer companyId,
		@Param("query") String query,
		Pageable pageable
	);

	Optional<ClientEntity> findByIdAndDeletedAtIsNull(int id);

	@Query("SELECT c FROM ClientEntity c WHERE c.groupEntity.id = :groupId AND c.licenseNum = :licenseNum AND c.deletedAt IS NULL")
	Optional<ClientEntity> findDuplicateClient(
		@Param("groupId") Integer groupId,
		@Param("licenseNum") String licenseNum);

	@Modifying
	@Transactional
	@Query("UPDATE ClientEntity c SET c.deletedAt = CURRENT_TIMESTAMP WHERE c.id IN :ids")
	void deleteAllByIds(@Param("ids") List<Integer> ids);

	@Modifying
	@Transactional
	@Query("UPDATE ClientEntity c SET c.deletedAt = CURRENT_TIMESTAMP WHERE c.id = :clientId AND c.deletedAt IS NULL")
	void softDeleteById(@Param("clientId") Integer clientId);
}
