package com.alphamail.api.erp.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.alphamail.api.erp.infrastructure.entity.QuoteEntity;

@Repository
public interface QuoteJpaRepository extends JpaRepository<QuoteEntity, Integer>,
	JpaSpecificationExecutor<QuoteEntity> {
}
