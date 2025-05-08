package com.alphamail.api.erp.infrastructure.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alphamail.api.erp.infrastructure.entity.QuoteEntity;

@Repository
public interface QuoteJpaRepository extends JpaRepository<QuoteEntity, Integer>,
	JpaSpecificationExecutor<QuoteEntity> {

	@Modifying
	@Transactional
	@Query("UPDATE QuoteEntity q SET q.deletedAt = CURRENT_TIMESTAMP WHERE q.id IN :ids")
	void deleteAllByIds(@Param("ids") List<Integer> ids);
}
