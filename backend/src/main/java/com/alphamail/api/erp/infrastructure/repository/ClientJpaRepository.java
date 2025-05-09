package com.alphamail.api.erp.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.domain.entity.Client;
import com.alphamail.api.erp.infrastructure.entity.ClientEntity;

@Repository
public interface ClientJpaRepository extends JpaRepository<ClientEntity, Integer> {

	Optional<ClientEntity> findByIdAndDeletedAtIsNull(int id);

	@Query("SELECT c FROM ClientEntity c WHERE c.groupEntity.id = :groupId AND c.licenseNum = :licenseNum AND c.deletedAt IS NULL")
	Optional<ClientEntity> findDuplicateClient(
		@Param("groupId") Integer groupId,
		@Param("licenseNum") String licenseNum);
}
