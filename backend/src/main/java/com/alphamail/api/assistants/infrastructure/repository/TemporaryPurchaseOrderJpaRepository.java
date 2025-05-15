package com.alphamail.api.assistants.infrastructure.repository;

import com.alphamail.api.assistants.infrastructure.entity.TemporaryPurchaseOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TemporaryPurchaseOrderJpaRepository extends JpaRepository<TemporaryPurchaseOrderEntity, Integer> {

    Optional<TemporaryPurchaseOrderEntity> findByIdAndUserUserId(Integer id, Integer userId);
}
